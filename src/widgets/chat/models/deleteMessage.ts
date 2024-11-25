import { WSActionsTypes } from '../../../shared/types/WSActionsTypes';

export const deleteMessage = (
  messageId: number,
  chatId: string | undefined,
  socket: WebSocket | null
) => {
  try {
    if (chatId && socket?.readyState == 1) {
      const data = JSON.stringify({
        payload: {
          id: messageId,
          chatId,
        },
        action: WSActionsTypes.DeleteMessage,
      });
      socket.send(data);
    }
  } catch (error) {
    console.log(error);
  }
};
