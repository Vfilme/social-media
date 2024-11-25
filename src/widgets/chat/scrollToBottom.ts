export const scrollToBottom = (
  messagesEndRef: React.RefObject<HTMLDivElement>,
  behavior: 'auto' | 'smooth' = 'auto'
) => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior,
    });
  }
};
