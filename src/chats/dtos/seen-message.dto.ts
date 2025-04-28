import { UUID } from 'crypto';

export class SeenMessageDto {
  conversationId: UUID;

  messageId: UUID;
}
