import { WSActionsTypes } from '../../../shared/types/WSActionsTypes';

export const sendEditedMessage = (
  editableMessage: any,
  newContent: string,
  socket: WebSocket,
  chatId: string
) => {
  const newMessage = { ...editableMessage, content: newContent };
  const data = JSON.stringify({
    payload: { message: newMessage, chatId },
    action: WSActionsTypes.EditMessage,
  });
  if (socket.readyState == 1) {
    socket.send(data);
  }
};
