import React, { useEffect, useRef, useState } from 'react';
import { sendNewMessage } from '../model/sendNewMessage';
import { useParams } from 'react-router-dom';
import './sendMessage.scss';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { sendEditedMessage } from '../model/sendEditedMessage';

interface Props {
  addMessage: (message: string) => void;
  editableMessage: any | null;
  removeEditMode: () => void;
}

export const SendMessage: React.FC<Props> = ({
  addMessage,
  editableMessage,
  removeEditMode,
}) => {
  const socket = useAppSelector((state) => state.websocket.socket);
  const { id } = useParams(); // chat id
  const [contentMessage, setContentMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const user: any = useAppSelector((state) => state.user.user);

  const writeMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (editableMessage?.type) {
      case 'edit': {
        if (socket && id)
          sendEditedMessage(editableMessage, contentMessage, socket, id);
        removeEditMode();
        break;
      }
      case 'reply': {
        const data = JSON.stringify({
          payload: {
            chatId: id,
            messageType: 'reply',
            content: contentMessage,
            replyToMessageId: editableMessage.id,
            replyToContent: editableMessage.content,
            replyToLogin: editableMessage.User.login,
            userLogin: user.login,
          },
          action: 'addMessage',
        });
        if ((socket as any)?.readyState == 1) {
          (socket as any).send(data);
        }
        removeEditMode();

        const newMessage = {
          type: 'text',
          content: contentMessage,
          reply_to_message_id: editableMessage.id,
          replyToContent: editableMessage.content,
        };

        addMessage(newMessage as any);

        break;
      }
      case 'forward': {
        const data = JSON.stringify({
          payload: {
            chatId: id,
            content: editableMessage.content,
            messageType: 'forward',
            userLogin: user.login,
          },
          action: 'addMessage',
        });

        if ((socket as any)?.readyState == 1) {
          (socket as any).send(data);
        }

        const newMessage = {
          content: editableMessage.content,
          type: 'forward',
        };
        const newMessageWithForward = {
          type: 'text',
          content: contentMessage,
        };

        addMessage(newMessage as any);
        addMessage(newMessageWithForward as any);

        sendNewMessage(user.login, id, socket, contentMessage);

        removeEditMode();
        break;
      }
      default:
        {
          sendNewMessage(user.login, id, socket, contentMessage);
          const newMessage = {
            content: contentMessage,
          };
          addMessage(newMessage as any);
        }
        setContentMessage('');
    }
  };

  useEffect(() => {
    if (editableMessage?.type == 'edit') {
      setContentMessage(editableMessage.content);
    } else {
      setContentMessage('');
    }
  }, [editableMessage]);

  return (
    <form onSubmit={writeMessage} className="sender-of-message">
      <div className="entry-zone">
        <div className={`editable-message ${editableMessage ? 'active' : ''}`}>
          <span> {editableMessage?.content}</span>
          <svg onClick={() => removeEditMode()}>
            <path d="M2 18L18 2M2 2L18 18"></path>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={contentMessage}
          onChange={(e) => setContentMessage(e.target.value)}
          placeholder="Введите сообщение"
        />
      </div>
      <button type="submit">send</button>
    </form>
  );
};
