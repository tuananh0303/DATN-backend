import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { SearchQueryDto } from './dtos/search-query.dto';
import { FacilityStatusEnum } from '../facilities/enums/facility-status.enum';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async searchFacilities(searchQueryDto: SearchQueryDto) {
    const {
      query,
      page = 1,
      limit = 10,
      sortBy,
      sortOrder,
      location,
      minRating,
      sportIds,
    } = searchQueryDto;

    try {
      // Calculate starting position based on page and limit
      const from = (page - 1) * limit;

      // Build Elasticsearch query
      const must: any[] = [];
      const should: any[] = [];
      const filter: any[] = [];

      // Only search for active facilities
      filter.push({
        term: {
          status: FacilityStatusEnum.ACTIVE,
        },
      });

      // Add search term for name, description, and location
      if (query && query.trim()) {
        should.push({
          multi_match: {
            query: query.trim(),
            fields: ['name^3', 'description^2', 'location'],
            type: 'best_fields',
            fuzziness: 'AUTO',
          },
        });
      }

      // Add location filter if provided
      if (location && location.trim()) {
        must.push({
          match: {
            'location.keyword': location.trim(),
          },
        });
      }

      // Add minimum rating filter
      if (minRating !== undefined && minRating !== null) {
        filter.push({
          range: {
            avgRating: {
              gte: minRating,
            },
          },
        });
      }

      // Add sport filter if provided
      if (sportIds && sportIds.length > 0) {
        const sportsFilter = sportIds.map(sportId => ({
          nested: {
            path: 'sports',
            query: {
              term: {
                'sports.id': sportId
              }
            }
          }
        }));
        
        filter.push({
          bool: {
            should: sportsFilter,
            minimum_should_match: 1
          }
        });
      }

      // Build sort configuration
      const sort: any[] = [];
      if (sortBy) {
        sort.push({
          [sortBy]: {
            order: sortOrder || 'desc',
          },
        });
      } else {
        // Default sort by average rating
        sort.push({
          avgRating: {
            order: 'desc',
          },
        });
      }

      // Create Elasticsearch query object
      const queryObject = {
        body: {
          from,
          size: limit,
          sort,
          query: {
            bool: {
              must,
              should,
              filter,
              minimum_should_match: should.length > 0 ? 1 : 0,
            },
          },
          highlight: {
            fields: {
              name: {},
              description: {},
              location: {},
            },
            pre_tags: ['<strong>'],
            post_tags: ['</strong>'],
          },
        },
      };

      // Execute search
      const searchResults = await this.elasticsearchService.search(
        this.elasticsearchService.getFacilitiesIndex(),
        queryObject,
      );

      const hits = searchResults.hits.hits;
      const total = searchResults.hits.total.value || 0;

      // Transform search results
      const facilities = hits.map((hit) => {
        const source = hit._source as any;
        const highlight = hit.highlight || {};

        return {
          id: source.id,
          name: source.name,
          description: source.description,
          location: source.location,
          avgRating: source.avgRating,
          numberOfRating: source.numberOfRating,
          status: source.status,
          imagesUrl: source.imagesUrl || [],
          openTime1: source.openTime1,
          closeTime1: source.closeTime1,
          openTime2: source.openTime2,
          closeTime2: source.closeTime2,
          openTime3: source.openTime3,
          closeTime3: source.closeTime3,
          numberOfShifts: source.numberOfShifts,
          sports: source.sports || [],
          fieldGroups: source.fieldGroups || [],
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          score: hit._score,
          highlight,
        };
      });

      // Return paginated results
      return {
        items: facilities,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error: any) {
      this.logger.error(`Error searching facilities: ${error.message}`, error.stack);
      // Return empty results on error
      return {
        items: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
        error: 'An error occurred while searching facilities'
      };
    }
  }

  async syncFacilitiesToElasticsearch(facilities: any[]) {
    try {
      if (!facilities || facilities.length === 0) {
        this.logger.warn('No facilities provided for syncing');
        return { success: false, message: 'No facilities provided' };
      }

      await this.elasticsearchService.bulkIndex(
        this.elasticsearchService.getFacilitiesIndex(),
        facilities
      );

      return { 
        success: true, 
        message: `Successfully synced ${facilities.length} facilities to Elasticsearch` 
      };
    } catch (error: any) {
      this.logger.error(`Error syncing facilities to Elasticsearch: ${error.message}`, error.stack);
      return { 
        success: false, 
        message: `Failed to sync facilities: ${error.message}` 
      };
    }
  }
} 