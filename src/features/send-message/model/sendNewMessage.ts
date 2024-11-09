import { WSTypes } from '../../../shared/types/WSTypes';

export const sendNewMessage = (
  userLogin: string,
  chatId: string | undefined,
  socket: WebSocket | null,
  message: string
) => {
  if (userLogin && !isNaN(Number(chatId)) && socket && message !== '') {
    const data = JSON.stringify({
      action: WSTypes.AddMessage,
      payload: { userLogin, chatId, content: message },
    });
    socket.send(data);
  }
};
