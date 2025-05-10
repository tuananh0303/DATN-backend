import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { SearchQueryDto } from './dtos/search-query.dto';
import { FacilityStatusEnum } from '../facilities/enums/facility-status.enum';
import { FacilityService } from '../facilities/facility.service';
import { Cron } from '@nestjs/schedule';

// Khai báo các interface cho kết quả tìm kiếm
interface ElasticsearchSource {
  id: string;
  name: string;
  description: string;
  location: string;
  avgRating: number;
  numberOfRating: number;
  status: FacilityStatusEnum;
  imagesUrl?: string[];
  openTime1: string;
  closeTime1: string;
  openTime2?: string;
  closeTime2?: string;
  openTime3?: string;
  closeTime3?: string;
  numberOfShifts: number;
  sports?: any[];
  fieldGroups?: any[];
  createdAt: string;
  updatedAt: string;
  minPrice?: number;
  maxPrice?: number;
}

interface ElasticsearchHit {
  _source: ElasticsearchSource;
  _score: number;
  highlight?: Record<string, string[]>;
}

interface ElasticsearchResponse {
  hits: {
    hits: ElasticsearchHit[];
    total: {
      value: number;
    };
  };
}

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
  ) {}

  // Tự động đồng bộ dữ liệu mỗi 30 phút
  @Cron('0 */30 * * * *')
  async scheduleElasticsearchSync() {
    this.logger.log('Starting scheduled Elasticsearch sync');
    try {
      await this.syncAllFacilitiesToElasticsearch();
      this.logger.log('Scheduled Elasticsearch sync completed successfully');
    } catch (error) {
      this.logger.error('Scheduled Elasticsearch sync failed', error);
    }
  }

  async searchFacilities(searchQueryDto: SearchQueryDto) {
    const {
      query,
      page = 1,
      limit = 10,
      sortBy,
      sortOrder,
      location,
      province,
      district,
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

      // Biến debug - đặt thành false để chỉ hiển thị facilities có status là ACTIVE
      const debug = false;
      
      // Only search for active facilities 
      if (!debug) {
        filter.push({
          term: {
            status: FacilityStatusEnum.ACTIVE,
          },
        });
      }

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

      // Xử lý tìm kiếm theo province, district và location
      if (province || district || location) {
        // Nếu có location, sử dụng trực tiếp
        if (location && location.trim()) {
          must.push({
            match: {
              location: location.trim(),
            },
          });
        } 
        // Nếu có province hoặc district, tìm kiếm trong trường location
        else if (province || district) {
          let locationQuery = '';
          
          if (province) {
            locationQuery += province.trim();
          }
          
          if (district) {
            locationQuery += locationQuery ? `, ${district.trim()}` : district.trim();
          }
          
          if (locationQuery) {
            must.push({
              match: {
                location: locationQuery,
              },
            });
          }
        }
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

      // Chuyển đổi sportIds thành mảng nếu nó là giá trị đơn
      const sportIdsArray = sportIds ? 
        (Array.isArray(sportIds) ? sportIds : [sportIds]) : 
        [];

      // Add sport filter if provided
      if (sportIdsArray.length > 0) {
        const sportsFilter = sportIdsArray.map((sportId) => ({
          nested: {
            path: 'sports',
            query: {
              term: {
                'sports.id': sportId,
              },
            },
          },
        }));

        filter.push({
          bool: {
            should: sportsFilter,
            minimum_should_match: 1,
          },
        });
      }

      // Build sort configuration
      const sort: any[] = [];
      if (sortBy) {
        // Add sort configuration only if we have data
        sort.push({
          [sortBy]: {
            order: sortOrder || 'desc',
          },
        });
      } else {
        // Default sort by createdAt instead of avgRating to avoid errors when no data
        sort.push({
          createdAt: {
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

      // Execute search with try/catch
      let searchResults;
      try {
        // Giảm logging chi tiết query
        this.logger.log(`Executing search with query: ${query || 'empty'}`);
        searchResults = (await this.elasticsearchService.search(
          this.elasticsearchService.getFacilitiesIndex(),
          queryObject,
        )) as ElasticsearchResponse;
        
        // Không log toàn bộ kết quả tìm kiếm
        const totalHits = searchResults.hits?.total?.value || 0;
        this.logger.log(`Found ${totalHits} results`);
        
        if (!searchResults.hits || !searchResults.hits.hits || searchResults.hits.hits.length === 0) {
          this.logger.log('No search results found');
        }
      } catch (searchError: unknown) {
        this.logger.error(
          `Search failed: ${searchError instanceof Error ? searchError.message : 'Unknown error'}`,
        );
        return [];
      }

      const hits = searchResults.hits.hits;
      
      // Transform search results to match the format from getByFacility
      return hits.map((hit) => {
        const source = hit._source;
        
        return {
          id: source.id,
          name: source.name,
          description: source.description || '',
          location: source.location,
          avgRating: source.avgRating || 0,
          numberOfRating: source.numberOfRating || 0,
          status: source.status,
          imagesUrl: source.imagesUrl || [],
          openTime1: source.openTime1,
          closeTime1: source.closeTime1,
          openTime2: source.openTime2 || null,
          closeTime2: source.closeTime2 || null, 
          openTime3: source.openTime3 || null,
          closeTime3: source.closeTime3 || null,
          numberOfShifts: source.numberOfShifts || 1,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          // Sports data formatted to match the expected response
          sports: Array.isArray(source.sports) 
            ? source.sports.map((sport) => ({
                id: sport.id,
                name: sport.name,
              })) 
            : [],
          // Min and max price values
          minPrice: source.minPrice || 0,
          maxPrice: source.maxPrice || 0
        };
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error searching facilities: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error('Error searching facilities: Unknown error');
      }
      // Return empty results on error
      return [];
    }
  }

  /**
   * Synchronize all facilities to Elasticsearch
   * @returns Promise with message
   */
  async syncAllFacilitiesToElasticsearch(): Promise<{ message: string }> {
    try {
      this.logger.log('Starting facility synchronization with Elasticsearch');
      await this.facilityService.syncAllFacilitiesToElasticsearch();
      this.logger.log('Facility synchronization completed');
      return { message: 'All facilities synchronized to Elasticsearch successfully' };
    } catch (error) {
      this.logger.error('Failed to sync facilities to Elasticsearch', error);
      throw error;
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
        facilities,
      );

      return {
        success: true,
        message: `Successfully synced ${facilities.length} facilities to Elasticsearch`,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error syncing facilities to Elasticsearch: ${error.message}`,
          error.stack,
        );
        return {
          success: false,
          message: `Failed to sync facilities: ${error.message}`,
        };
      }
      return {
        success: false,
        message: 'Failed to sync facilities: Unknown error',
      };
    }
  }
}
