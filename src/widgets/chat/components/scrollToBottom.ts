export const scrollToBottom = (
  messagesEndRef: React.RefObject<HTMLDivElement>
) => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }
};
