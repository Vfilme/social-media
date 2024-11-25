export function updateMessagesStatus(dateWithMessages: any, userLogin: string) {
  return dateWithMessages.map(([date, messages]: any) => {
    const updatedMessages = messages.map((message: any) => {
      if (message.User.login === userLogin) {
        return { ...message, status: 'read' };
      }
      return message;
    });

    return [date, updatedMessages];
  });
}
