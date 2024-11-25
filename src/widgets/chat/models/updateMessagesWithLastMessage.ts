export const updateMessagesWithLastMessage = (
  dateWithMessages: any,
  newMessage: any
) => {
  return dateWithMessages.map(([date, messages]: any) => {
    let isUpdated = false;
    const updatedMessages = messages.map((message: any) => {
      if (!message.id && !isUpdated) {
        isUpdated = true;
        return { ...newMessage };
      }
      return message;
    });

    return [date, updatedMessages];
  });
};
