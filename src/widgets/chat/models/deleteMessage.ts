import { WSTypes } from '../../../shared/types/WSTypes';

export const deleteMessage = (
  messageId: number,
  chatId: string | undefined,
  socket: WebSocket
) => {
  try {
    if (chatId && socket?.readyState == 1) {
      const data = JSON.stringify({
        payload: {
          id: messageId,
          chatId,
        },
        action: WSTypes.DeleteMessage,
      });
      socket.send(data);
    }
  } catch (error) {
    console.log(error);
  }
};
