import React from 'react';
import './messageMenu.scss';
import { MessageActions } from '../../types/messageActions';
import { useAppSelector } from '../../../../shared/store/hooks/useAppSelector';

interface Props {
  onClickPoint: (type: string) => void;
  activeMessage: any;
  positionMessageMenu: { x: number; y: number };
}

export const MessageMenu: React.FC<Props> = ({
  onClickPoint,
  activeMessage,
  positionMessageMenu,
}) => {
  const user: any = useAppSelector((state) => state.user.user);
  return (
    <div
      className="message-menu"
      style={{
        left: `${positionMessageMenu.x}px`,
        top: `${positionMessageMenu.y}px`,
      }}
    >
      <ul>
        <li onClick={() => onClickPoint(MessageActions.Reply)}>ответить</li>
        <li
          onClick={() => navigator.clipboard.writeText(activeMessage.content)}
        >
          копировать
        </li>
        {activeMessage?.type != MessageActions.Forward &&
        activeMessage?.User.login == user?.login ? (
          <li onClick={() => onClickPoint(MessageActions.Edit)}>
            редактировать
          </li>
        ) : (
          ''
        )}
        <li
          onClick={() => {
            onClickPoint(MessageActions.Forward);
          }}
        >
          переслать
        </li>
        <li
          className="delete"
          onClick={() => onClickPoint(MessageActions.Delete)}
        >
          удалить
        </li>
      </ul>
    </div>
  );
};
