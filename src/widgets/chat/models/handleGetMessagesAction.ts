import { getGropedMessagesByDate } from './getGroupedMessagesByDate';

export function handleGetMessagesAction(payload: any, currentChatId: any) {
  const { messages, partnerLogin, chatId } = payload;
  const dateWithMessages =
    chatId === currentChatId ? getGropedMessagesByDate(messages) : [];

  return {
    dateWithMessages,
    partner: { login: partnerLogin },
  };
}
