import { WSTypes } from '../../../shared/types/WSTypes';

export const sendEditedMessage = (
  editableMessage: any,
  newContent: string,
  socket: WebSocket,
  chatId: string
) => {
  const newMessage = { ...editableMessage, content: newContent };
  const data = JSON.stringify({
    payload: { message: newMessage, chatId },
    action: WSTypes.EditMessage,
  });
  if (socket.readyState == 1) {
    socket.send(data);
  }
};
