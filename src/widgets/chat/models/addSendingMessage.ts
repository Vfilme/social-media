export function addSendingMessage(dateWithMessages: any, newMessage: any) {
  const objDateWithMessages = Object.fromEntries(dateWithMessages);
  const currentDate = new Date().toLocaleDateString();

  objDateWithMessages[currentDate] = [
    ...(objDateWithMessages[currentDate] || []),
    newMessage,
  ];
  const newDateWithMessages = objDateWithMessages;
  return Object.entries(newDateWithMessages);
}
