import { Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dtos/search-query.dto';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ElasticsearchService } from './elasticsearch.service';
import { UUID } from 'crypto';
import { FacilityService } from 'src/facilities/facility.service';
import { Logger } from '@nestjs/common';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(
    private readonly searchService: SearchService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly facilityService: FacilityService,
  ) {}

  @ApiOperation({
    summary: 'Search facilities with optional filters and sort',
    description: 'Returns facilities matching the search criteria including sports, location, and rating filters'
  })
  @ApiResponse({
    status: 200,
    description: 'List of facilities matching the search criteria',
  })
  @Get('facilities')
  @AuthRoles(AuthRoleEnum.NONE)
  async searchFacilities(@Query() searchQueryDto: SearchQueryDto) {
    return this.searchService.searchFacilities(searchQueryDto);
  }

  @ApiOperation({
    summary: 'Get detailed facility information by ID',
    description: 'Returns complete facility details with all related information'
  })
  @ApiResponse({
    status: 200,
    description: 'Detailed facility information',
  })
  @ApiResponse({
    status: 404,
    description: 'Facility not found',
  })
  @Get('facility/:id')
  @AuthRoles(AuthRoleEnum.NONE)
  async getFacilityById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.facilityService.getByFacility(id);
  }

  @ApiOperation({
    summary: 'Trigger sync of facilities to Elasticsearch (Admin only)',
    description: 'Synchronizes all facilities data from the database to Elasticsearch'
  })
  @ApiResponse({
    status: 200,
    description: 'Synchronization successful',
  })
  @Post('sync-facilities')
  @AuthRoles(AuthRoleEnum.ADMIN)
  async syncFacilities() {
    return this.searchService.syncAllFacilitiesToElasticsearch();
  }

  @ApiOperation({
    summary: 'Reset Elasticsearch index and recreate it (Admin only)',
    description: 'Recreates the Elasticsearch index from scratch'
  })
  @ApiResponse({
    status: 200,
    description: 'Index reset successful',
  })
  @Post('reset-index')
  @AuthRoles(AuthRoleEnum.ADMIN)
  async resetIndex() {
    this.logger.log('Starting to reset Elasticsearch index');
    
    try {
      // First, reset the index
      const resetResult = await this.elasticsearchService.resetIndex();
      this.logger.log('Index reset complete, starting data synchronization');
      
      // Then synchronize all facilities
      await this.searchService.syncAllFacilitiesToElasticsearch();
      
      return { 
        success: true,
        message: 'Index reset and data synchronization completed successfully'
      };
    } catch (error) {
      this.logger.error('Error during index reset or data synchronization', error);
      
      if (error instanceof Error) {
        return { 
          success: false,
          message: `Failed to reset index: ${error.message}`
        };
      }
      
      return {
        success: false,
        message: 'Failed to reset index due to an unknown error'
      };
    }
  }

  @ApiOperation({
    summary: 'Webhook to trigger Elasticsearch sync',
    description: 'External systems can call this endpoint to trigger data synchronization'
  })
  @ApiResponse({
    status: 200,
    description: 'Synchronization triggered successfully',
  })
  @Post('webhook/sync-data')
  async webhookSyncData() {
    this.logger.log('Elasticsearch sync triggered via webhook');
    
    try {
      await this.searchService.syncAllFacilitiesToElasticsearch();
      return { 
        success: true,
        message: 'Elasticsearch sync triggered successfully'
      };
    } catch (error) {
      this.logger.error('Webhook-triggered sync failed', error);
      
      if (error instanceof Error) {
        return { 
          success: false,
          message: `Failed to sync: ${error.message}`
        };
      }
      
      return {
        success: false,
        message: 'Failed to sync due to an unknown error'
      };
    }
  }

  @ApiOperation({
    summary: 'Check synchronization status',
    description: 'Check if data is properly synchronized between the database and Elasticsearch'
  })
  @ApiResponse({
    status: 200,
    description: 'Sync status information',
  })
  @Get('sync-status')
  @AuthRoles(AuthRoleEnum.NONE)
  async checkSyncStatus() {
    this.logger.log('Checking Elasticsearch sync status');
    
    try {
      // Count documents in Elasticsearch
      const indexName = this.elasticsearchService.getFacilitiesIndex();
      const esCount = await this.elasticsearchService.countDocuments(indexName);
      
      // Count facilities in database
      const dbCount = await this.facilityService.getAll();
      
      const isSynced = esCount.count === dbCount.length;
      
      return {
        success: true,
        syncStatus: {
          isSynced,
          elasticsearchDocuments: esCount.count,
          databaseDocuments: dbCount.length,
          difference: Math.abs(esCount.count - dbCount.length)
        },
        message: isSynced 
          ? 'Data is properly synchronized'
          : 'Data synchronization issue detected - counts do not match'
      };
    } catch (error) {
      this.logger.error('Error checking sync status', error);
      
      if (error instanceof Error) {
        return { 
          success: false,
          message: `Failed to check sync status: ${error.message}`
        };
      }
      
      return {
        success: false,
        message: 'Failed to check sync status due to an unknown error'
      };
    }
  }

  // DEV API - only for development
  @ApiOperation({
    summary: '[DEV] Reset and fix mapping issues',
    description: 'Development endpoint for fixing the mapping of the Elasticsearch index'
  })
  @ApiResponse({
    status: 200,
    description: 'Mapping fixed successfully',
  })
  @Post('dev/fix-mapping')
  async devFixMapping() {
    this.logger.log('Starting to fix Elasticsearch mapping');
    
    try {
      const resetResult = await this.elasticsearchService.resetIndex();
      this.logger.log('Index reset complete, starting data synchronization');
      
      await this.searchService.syncAllFacilitiesToElasticsearch();
      
      return { 
        success: true,
        message: 'Index mapping fixed and data synchronization completed successfully'
      };
    } catch (error) {
      this.logger.error('Error during mapping fix', error);
      
      if (error instanceof Error) {
        return { 
          success: false,
          message: `Failed to fix mapping: ${error.message}`
        };
      }
      
      return {
        success: false,
        message: 'Failed to fix mapping due to an unknown error'
      };
    }
  }
}
