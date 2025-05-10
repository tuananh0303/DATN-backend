import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dtos/search-query.dto';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { FacilityService } from 'src/facilities/facility.service';
import { Logger } from '@nestjs/common';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(
    private readonly searchService: SearchService,
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
}
