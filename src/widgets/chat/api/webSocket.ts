import { URL } from '../../../shared/const/urls';
import { WSTypes } from '../../../shared/types/WSTypes';

export const webSocket = (
  userId: number,
  chatId: string | undefined,
  onMessage: (data: any) => void,
  setConnect: (socket: WebSocket) => void
) => {
  const ws = new WebSocket(URL.BAZE_WS);
  ws.onopen = () => {
    setConnect(ws);
    console.log('Соединение с сервером установлено');
    if (userId && !isNaN(Number(chatId))) {
      const data = JSON.stringify({
        type: WSTypes.GetMessages,
        chatId: chatId,
        userId: userId,
      });
      ws.send(data);
    }
  };

  ws.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
  ws.onerror = (error: Event) => {
    console.error('Ошибка WebSocket:', error);
  };
  ws.onclose = () => {
    console.log('Соединение с сервером закрыто');
  };
};