import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        node:
          configService.get('ELASTICSEARCH_NODE') || 'http://localhost:9200',
        maxRetries: 10,
        requestTimeout: 60000,
        apiVersion: '8',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService, ElasticsearchService],
  exports: [SearchService, ElasticsearchService],
})
export class SearchModule {}
