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

      // Create index if it doesn't exist
      if (!indexExists) {
        await this.createFacilitiesIndex();
        this.logger.log(
          `Index ${this.indices.facilities} created successfully`,
        );
      } else {
        // Index exists but we might need to update it
        this.logger.log(
          `Index ${this.indices.facilities} already exists, skipping creation`,
        );
        
        // Check if we need to update mappings
        try {
          // For development purposes, you might want to update the existing index
          // In production, consider using index aliases and create a new index instead
          await this.updateFacilitiesIndexMapping();
        } catch (updateError) {
          this.logger.warn(
            `Could not update index mapping: ${updateError instanceof Error ? updateError.message : 'Unknown error'}`,
          );
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Error checking indices: ${errorMessage}`,
        error instanceof Error ? error.stack : undefined,
      );
      // We'll log the error but not throw, allowing the application to continue
      // even if Elasticsearch is not available
    }
  }

  private async createFacilitiesIndex() {
    try {
      // Check if index already exists
      const indexExists = await this.elasticsearchService.indices.exists({
        index: this.indices.facilities,
      });

      // If index already exists, we might need to close it before updating settings
      if (indexExists) {
        // Try to delete the index and recreate it (in development environments)
        // In production, you might want to use aliases and create a new index instead
        try {
          await this.elasticsearchService.indices.delete({
            index: this.indices.facilities,
          });
          this.logger.log(`Deleted existing index ${this.indices.facilities}`);
        } catch (deleteError) {
          this.logger.error(
            `Could not delete existing index: ${deleteError.message}`,
            deleteError.stack,
          );
          
          // If we can't delete, try to close before updating settings
          try {
            await this.elasticsearchService.indices.close({
              index: this.indices.facilities,
            });
            this.logger.log(`Closed index ${this.indices.facilities} for updates`);
          } catch (closeError) {
            this.logger.error(
              `Could not close index: ${closeError.message}`,
              closeError.stack,
            );
            // If we can't close either, throw an error
            throw new Error(
              'Index exists but cannot be deleted or closed for updates',
            );
          }
        }
      }

      // Create index with settings and mappings in one operation
      await this.elasticsearchService.indices.create({
        index: this.indices.facilities,
        body: {
          settings: {
            number_of_shards: 1,
            number_of_replicas: 1,
            analysis: {
              analyzer: {
                standard: {
                  type: 'standard',
                },
              },
            },
          },
          mappings: {
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
                  id: { type: 'keyword' },
                  name: { type: 'text' },
                  basePrice: { type: 'float' },
                },
              },
              createdAt: { type: 'date' },
              updatedAt: { type: 'date' },
            }
          }
        }
      });

      // If we closed the index earlier, reopen it
      if (indexExists) {
        try {
          await this.elasticsearchService.indices.open({
            index: this.indices.facilities,
          });
          this.logger.log(`Reopened index ${this.indices.facilities}`);
        } catch (openError) {
          this.logger.error(
            `Could not reopen index: ${openError.message}`,
            openError.stack,
          );
        }
      }

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
      // Include minPrice and maxPrice if they exist
      minPrice: facility.minPrice || 0,
      maxPrice: facility.maxPrice || 0
    };

    // Collect all sports from various sources
    let allSports: any[] = [];

    // Get sports from licenses
    if (
      facility.licenses &&
      Array.isArray(facility.licenses) &&
      facility.licenses.length > 0
    ) {
      const licenseSports = facility.licenses
        .map((license: any) => ({
          id: license.sport?.id,
          name: license.sport?.name,
        }))
        .filter((sport: any) => sport.id && sport.name);
      
      allSports = [...allSports, ...licenseSports];
    }

    // Get sports directly if available
    if (
      facility.sports &&
      Array.isArray(facility.sports) &&
      facility.sports.length > 0
    ) {
      allSports = [...allSports, ...facility.sports];
    }

    // Get sports from fieldGroups
    if (
      facility.fieldGroups &&
      Array.isArray(facility.fieldGroups) &&
      facility.fieldGroups.length > 0
    ) {
      const fieldGroupSports = facility.fieldGroups
        .filter((group: any) => 
          group.sports && 
          Array.isArray(group.sports) && 
          group.sports.length > 0
        )
        .flatMap((group: any) => group.sports);
      
      if (fieldGroupSports.length > 0) {
        allSports = [...allSports, ...fieldGroupSports];
      }
    }

    // Remove duplicate sports
    if (allSports.length > 0) {
      document.sports = allSports
        .filter(
          (sport, index, self) =>
            index === self.findIndex((s) => s.id === sport.id)
        )
        .map((sport) => ({
          id: sport.id,
          name: sport.name
        }));
    } else {
      document.sports = [];
    }

    // Add field groups information with basePrice for min/max calculation
    if (
      facility.fieldGroups &&
      Array.isArray(facility.fieldGroups) &&
      facility.fieldGroups.length > 0
    ) {
      document.fieldGroups = facility.fieldGroups.map((group: any) => ({
        id: group.id,
        name: group.name,
        basePrice: group.basePrice || 0,
      }));

      // Calculate minPrice and maxPrice if not already provided
      if (!facility.minPrice || !facility.maxPrice) {
        const prices = facility.fieldGroups
          .map((group: any) => group.basePrice || 0)
          .filter((price: number) => price > 0);

        if (prices.length > 0) {
          document.minPrice = Math.min(...prices);
          document.maxPrice = Math.max(...prices);
        }
      }
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
      this.logger.log(`Indexing ${data.length} documents to ${index}`);
      
      const body = data.flatMap((doc) => [
        { index: { _index: index, _id: doc.id } },
        this.mapFacilityToDocument(doc),
      ]);
      
      const result = await this.elasticsearchService.bulk({
        body,
        refresh: true,
      });
      
      this.logger.log(`Bulk indexing completed for ${body.length / 2} documents`);
      
      return result;
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

  /**
   * Count documents in an index
   */
  async countDocuments(index: string): Promise<any> {
    try {
      return await this.elasticsearchService.count({
        index,
      });
    } catch (error: any) {
      this.logger.error(
        `Error counting documents: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  // Add a new method to update mappings for an existing index
  private async updateFacilitiesIndexMapping() {
    try {
      // Update mappings for existing fields
      await this.elasticsearchService.indices.putMapping({
        index: this.indices.facilities,
        properties: {
          minPrice: { type: 'float' },
          maxPrice: { type: 'float' },
          fieldGroups: {
            type: 'nested',
            properties: {
              id: { type: 'keyword' },
              name: { type: 'text' },
              basePrice: { type: 'float' },
            },
          }
        }
      });
      
      this.logger.log(
        `Updated mappings for index ${this.indices.facilities}`,
      );
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Error updating index mappings: ${errorMessage}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  /**
   * Xóa hoàn toàn index hiện tại và tạo lại
   */
  async resetIndex(): Promise<any> {
    try {
      // Kiểm tra index có tồn tại không
      const indexExists = await this.elasticsearchService.indices.exists({
        index: this.indices.facilities,
      });

      // Nếu index tồn tại, xóa nó
      if (indexExists) {
        await this.elasticsearchService.indices.delete({
          index: this.indices.facilities,
        });
        this.logger.log(`Deleted existing index ${this.indices.facilities}`);
      }

      // Tạo lại index với settings và mappings mới
      await this.createFacilitiesIndex();
      this.logger.log(`Recreated index ${this.indices.facilities}`);

      return {
        success: true,
        message: `Index ${this.indices.facilities} has been reset successfully`,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Error resetting index: ${errorMessage}`,
        error instanceof Error ? error.stack : undefined,
      );
      return {
        success: false,
        message: `Failed to reset index: ${errorMessage}`,
      };
    }
  }
}
