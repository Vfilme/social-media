export const updateChats = (chats: any, lastChatId: number) => {
  return [...chats].map((chat: any) => {
    if (chat.id == lastChatId) {
      chat.updated_at = new Date();
    }
    return chat;
  });
};
