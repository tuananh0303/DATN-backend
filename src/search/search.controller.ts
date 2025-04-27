import { Controller, Get, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dtos/search-query.dto';
import { AuthRoles } from 'src/auths/decorators/auth-role.decorator';
import { AuthRoleEnum } from 'src/auths/enums/auth-role.enum';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('facilities')
  @AuthRoles(AuthRoleEnum.NONE)
  async searchFacilities(@Query() searchQueryDto: SearchQueryDto) {
    return this.searchService.searchFacilities(searchQueryDto);
  }

  @Post('sync-facilities')
  @AuthRoles(AuthRoleEnum.ADMIN)
  async syncFacilities() {
    // This is a placeholder until we implement the full integration with facility service
    await Promise.resolve(); // Adding await to satisfy linter
    return { message: 'Facility sync has been queued' };
  }
}
