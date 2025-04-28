import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { FacilityStatusEnum } from '../facilities/enums/facility-status.enum';

@Injectable()
export class ElasticsearchService implements OnModuleInit {
  private readonly logger = new Logger(ElasticsearchService.name);
  private readonly indices = {
    facilities: 'facilities',
  };

  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    try {
      await this.checkIndices();
    } catch (error: any) {
      this.logger.error('Elasticsearch initialization error', error?.stack);
    }
  }

  private async checkIndices() {
    try {
      const indexExists = await this.elasticsearchService.indices.exists({
        index: this.indices.facilities,
      });

      if (!indexExists) {
        await this.createFacilitiesIndex();
        this.logger.log(
          `Index ${this.indices.facilities} created successfully`,
        );
      }
    } catch (error: any) {
      this.logger.error(
        `Error checking indices: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async createFacilitiesIndex() {
    try {
      await this.elasticsearchService.indices.create({
        index: this.indices.facilities,
      });

      await this.elasticsearchService.indices.putMapping({
        index: this.indices.facilities,
        properties: {
          id: { type: 'keyword' },
          name: {
            type: 'text',
            analyzer: 'standard',
            fields: {
              keyword: { type: 'keyword' },
            },
          },
          description: { type: 'text', analyzer: 'standard' },
          location: {
            type: 'text',
            analyzer: 'standard',
            fields: {
              keyword: { type: 'keyword' },
            },
          },
          avgRating: { type: 'float' },
          numberOfRating: { type: 'integer' },
          status: { type: 'keyword' },
          imagesUrl: { type: 'keyword' },
          openTime1: { type: 'keyword' },
          closeTime1: { type: 'keyword' },
          openTime2: { type: 'keyword' },
          closeTime2: { type: 'keyword' },
          openTime3: { type: 'keyword' },
          closeTime3: { type: 'keyword' },
          numberOfShifts: { type: 'integer' },
          sports: {
            type: 'nested',
            properties: {
              id: { type: 'integer' },
              name: {
                type: 'text',
                fields: {
                  keyword: { type: 'keyword' },
                },
              },
            },
          },
          fieldGroups: {
            type: 'nested',
            properties: {
              id: { type: 'integer' },
              name: { type: 'text' },
            },
          },
          createdAt: { type: 'date' },
          updatedAt: { type: 'date' },
        }
      });

      await this.elasticsearchService.indices.putSettings({
        index: this.indices.facilities,
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1,
          analysis: {
            analyzer: {
              standard: {
                type: 'standard',
              },
            },
          }
        }
      });

      return true;
    } catch (error: any) {
      this.logger.error(
        `Error creating facilities index: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  async indexFacility(facility: any): Promise<any> {
    try {
      if (!facility) {
        this.logger.error('Attempted to index undefined facility');
        return;
      }

      const document = this.mapFacilityToDocument(facility);

      return this.elasticsearchService.index({
        index: this.indices.facilities,
        id: facility.id,
        document,
        refresh: true,
      });
    } catch (error: any) {
      this.logger.error(
        `Error indexing facility: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  private mapFacilityToDocument(facility: any) {
    // Basic facility properties
    const document: any = {
      id: facility.id,
      name: facility.name,
      description: facility.description || '',
      location: facility.location,
      avgRating: facility.avgRating || 0,
      numberOfRating: facility.numberOfRating || 0,
      status: facility.status || FacilityStatusEnum.PENDING,
      imagesUrl: facility.imagesUrl || [],
      openTime1: facility.openTime1,
      closeTime1: facility.closeTime1,
      openTime2: facility.openTime2 || null,
      closeTime2: facility.closeTime2 || null,
      openTime3: facility.openTime3 || null,
      closeTime3: facility.closeTime3 || null,
      numberOfShifts: facility.numberOfShifts || 1,
      createdAt: facility.createdAt,
      updatedAt: facility.updatedAt,
    };

    // Add sports information if available
    if (
      facility.licenses &&
      Array.isArray(facility.licenses) &&
      facility.licenses.length > 0
    ) {
      document.sports = facility.licenses
        .map((license: any) => ({
          id: license.sport?.id,
          name: license.sport?.name,
        }))
        .filter((sport: any) => sport.id && sport.name);
    }

    // Add field groups information if available
    if (
      facility.fieldGroups &&
      Array.isArray(facility.fieldGroups) &&
      facility.fieldGroups.length > 0
    ) {
      document.fieldGroups = facility.fieldGroups.map((group: any) => ({
        id: group.id,
        name: group.name,
      }));
    }

    return document;
  }

  async search<T>(index: string, query: Record<string, any>): Promise<any> {
    try {
      return await this.elasticsearchService.search({
        index,
        ...query,
      });
    } catch (error: any) {
      this.logger.error(
        `Error searching in Elasticsearch: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  async update(index: string, id: string, body: any): Promise<any> {
    try {
      return await this.elasticsearchService.update({
        index,
        id,
        body: {
          doc: body,
        },
        refresh: true,
      });
    } catch (error: any) {
      this.logger.error(
        `Error updating document: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  async delete(index: string, id: string): Promise<any> {
    try {
      return await this.elasticsearchService.delete({
        index,
        id,
        refresh: true,
      });
    } catch (error: any) {
      this.logger.error(
        `Error deleting document: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  async bulkIndex(index: string, data: any[]): Promise<any> {
    if (!data || data.length === 0) {
      this.logger.warn('No data provided for bulk indexing');
      return;
    }

    try {
      const body = data.flatMap((doc) => [
        { index: { _index: index, _id: doc.id } },
        this.mapFacilityToDocument(doc),
      ]);

      return await this.elasticsearchService.bulk({
        body,
        refresh: true,
      });
    } catch (error: any) {
      this.logger.error(
        `Error performing bulk indexing: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  async refreshIndex(index: string): Promise<any> {
    try {
      return await this.elasticsearchService.indices.refresh({
        index,
      });
    } catch (error: any) {
      this.logger.error(
        `Error refreshing index: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  getFacilitiesIndex(): string {
    return this.indices.facilities;
  }
}
