import { Test, TestingModule } from '@nestjs/testing';
import { CreateMessageService } from './create-message.service';
import { SendMessageService } from './send-message.service';
import { IMessageRepository } from 'src/repository/message/i-message.repository';
import { MessageFactory } from './message-factory';
import { SendMessageServiceDto, ChatbotMessageResponseDto } from './types';

describe('CreateMessageService', () => {
  let service: CreateMessageService;
  let messageRepository: jest.Mocked<IMessageRepository>;
  let sendMessageService: jest.Mocked<SendMessageService>;

  beforeEach(async () => {
    messageRepository = {
      insertMany: jest.fn(),
      // ...other methods if needed
    } as any;
    sendMessageService = {
      handle: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMessageService,
        { provide: 'MESSAGE_REPOSITORY', useValue: messageRepository },
        { provide: SendMessageService, useValue: sendMessageService },
      ],
    }).compile();

    service = module.get<CreateMessageService>(CreateMessageService);
  });

  it('should handle message creation and return entities', async () => {
    const dto: SendMessageServiceDto = {
      userId: 'user1',
      content: 'hi',
    } as any;
    const userMessage = { id: '1', content: 'hi', userId: 'user1' };
    const botResponse: ChatbotMessageResponseDto[] = [
      { content: 'hello', type: 'text' },
    ] as any;
    const botMessages = [{ id: '2', content: 'hello', userId: 'user1' }];
    const allMessages = [userMessage, ...botMessages];
    const entityMessages = [{ id: '1' }, { id: '2' }];

    jest.spyOn(MessageFactory, 'fromUser').mockReturnValue(userMessage as any);
    sendMessageService.handle.mockResolvedValue(botResponse);
    jest.spyOn(MessageFactory, 'fromBot').mockReturnValue(botMessages as any);
    messageRepository.insertMany.mockResolvedValue(allMessages as any);
    jest
      .spyOn(MessageFactory, 'toEntity')
      .mockReturnValue(entityMessages as any);

    const result = await service.handle(dto);
    expect(MessageFactory.fromUser).toHaveBeenCalledWith(dto);
    expect(sendMessageService.handle).toHaveBeenCalledWith(dto);
    expect(MessageFactory.fromBot).toHaveBeenCalledWith(
      botResponse,
      dto.userId
    );
    expect(messageRepository.insertMany).toHaveBeenCalledWith([
      userMessage,
      ...botMessages,
    ]);
    expect(MessageFactory.toEntity).toHaveBeenCalledWith(allMessages);
    expect(result).toEqual(entityMessages);
  });

  it('should propagate errors from sendMessageService', async () => {
    const dto: SendMessageServiceDto = {
      userId: 'user1',
      content: 'hi',
    } as any;
    jest.spyOn(MessageFactory, 'fromUser').mockReturnValue({} as any);
    sendMessageService.handle.mockRejectedValue(new Error('fail'));
    await expect(service.handle(dto)).rejects.toThrow('fail');
  });
});
