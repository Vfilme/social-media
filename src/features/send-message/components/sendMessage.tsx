import React, { useRef, useState } from 'react';
import { sendMessage } from '../model/sendMessage';
import { useParams } from 'react-router-dom';
import './sendMessage.scss';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';

interface Props {
  addMessage: (message: string) => void;
}

export const SendMessage: React.FC<Props> = ({ addMessage }) => {
  const socket = useAppSelector((state) => state.websocket.socket);
  const { id } = useParams(); // chat id
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const user: any = useAppSelector((state) => state.user.user);

  const writeMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(user.login, id, socket, message);
    addMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={writeMessage} className="send-message">
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button type="submit">send</button>
    </form>
  );
};
