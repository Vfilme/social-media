export function updateEditedMessage(dateWithMessages: any, editedMessage: any) {
  return dateWithMessages.map(([date, messages]: any) => {
    const newMessages = messages.map((message: any) => {
      if (message.id == editedMessage.id) message = { ...editedMessage };
      return message;
    });
    return [date, newMessages];
  });
}
