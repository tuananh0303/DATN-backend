export interface ElasticsearchConfig {
  node: string;
  maxRetries?: number;
  requestTimeout?: number;
  pingTimeout?: number;
  auth?: {
    username: string;
    password: string;
  };
}
