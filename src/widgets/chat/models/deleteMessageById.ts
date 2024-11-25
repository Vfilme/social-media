export function deleteMessageById(dateWithMessages: any, id: any) {
  return dateWithMessages.map(([date, messages]: any) => {
    const newMessages = messages.filter((message: any) => message.id != id);
    return [date, newMessages];
  });
}
