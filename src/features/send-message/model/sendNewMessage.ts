import { WSActionsTypes } from '../../../shared/types/WSActionsTypes';

export const sendNewMessage = (
  userLogin: string,
  chatId: string | undefined,
  socket: WebSocket | null,
  message: string
) => {
  if (userLogin && !isNaN(Number(chatId)) && socket && message !== '') {
    const data = JSON.stringify({
      action: WSActionsTypes.AddMessage,
      payload: { userLogin, chatId, content: message, messageType: 'text' },
    });
    socket.send(data);
  }
};
