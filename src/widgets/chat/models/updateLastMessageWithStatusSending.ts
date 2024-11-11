export const getUpdatedMessagesWithActualLastMessage = (
  dateWithMessages: any,
  message: any
) => {
  return dateWithMessages.map(([_, messages]: any) => {
    return [
      _,
      messages.map((m: any) => {
        if (!m?.id) m = { ...message };
        return m;
      }),
    ];
  });
};
