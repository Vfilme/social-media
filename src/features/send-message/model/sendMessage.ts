import { WSTypes } from '../../../shared/types/WSTypes';

export const sendMessage = (
  userLogin: string,
  chatId: string | undefined,
  socket: WebSocket | null,
  message: string
) => {
  if (userLogin && !isNaN(Number(chatId)) && socket && message !== '') {
    const data = JSON.stringify({
      type: WSTypes.AddMessage,
      userLogin,
      chatId,
      content: message,
    });
    socket.send(data);
  }
};
