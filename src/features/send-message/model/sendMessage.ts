import { WSTypes } from '../../../shared/types/WSTypes';

export const sendMessage = (
  userId: number | undefined,
  chatId: string | undefined,
  socket: WebSocket | null,
  message: string
) => {
  if (userId && !isNaN(Number(chatId)) && socket && message !== '') {
    const data = JSON.stringify({
      type: WSTypes.AddMessage,
      userId,
      chatId,
      content: message,
    });
    socket.send(data);
  }
};
