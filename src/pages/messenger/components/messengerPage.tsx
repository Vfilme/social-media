import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../shared/hooks';
import './messangerPage.scss';
import axios from 'axios';
import { UsersPage } from '../../users/components/usersPage';

enum WSTypes {
  GetMessages = 'getMessages',
  AddMessage = 'addMessage',
}

export const MessengerPage: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [userName, setUserName] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const user: any = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8090');
    ws.onopen = () => {
      console.log('Соединение с сервером установлено');

      if (user && id && messages) {
        console.log('here');
        const data = JSON.stringify({
          type: WSTypes.GetMessages,
          chatId: id,
          userId: user.id,
        });
        ws.send(data);
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      const { messages, userName } = JSON.parse(event.data);
      setUserName(userName);
      setMessages((prevMessages) => [...prevMessages, ...messages]);
    };

    ws.onerror = (error: Event) => {
      console.error('Ошибка WebSocket:', error);
    };
    ws.onclose = () => {
      console.log('Соединение с сервером закрыто');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [user, id]);

  useEffect(() => {
    setMessages([]);
  }, [id]);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && message && id) {
      const data = JSON.stringify({
        chatId: id,
        userId: user.id,
        content: message,
        type: WSTypes.AddMessage,
      });
      socket.send(data);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setMessage('');
    }
  };

  return (
    <div className="messenger">
      {/* <h3>Чат с id: {id}</h3>
      <h3>Имя пользователя: {user && user.email}</h3> */}
      <UsersPage userName={userName} />
      <div className="messages">
        {messages &&
          messages.map((m: any) => {
            return (
              <div
                className={`${m.user_id == user?.id ? 'me' : 'notme'} message`}
              >
                <h4>{user.id == m.user_id ? user.email : userName}</h4>
                <p>{m.content}</p>
              </div>
            );
          })}
        <div className="send-message">
          <form onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение"
            />
            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
};
