import React from 'react';
import { Post } from '../types/post';
import './post.scss';
import { getDayWithMonthFromDate } from '../../../shared/lib/getDayWithMonthFromDate';
import { PostMenu } from '../../../features/post-menu/postMenu';
import { PostActions } from '../../../features/post-actions/postActions';
import { PostViews } from '../../../features/post-views/postViews';

interface Props {
  post: Post;
  userName?: string;
}

export const News: React.FC<Props> = ({ userName, post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <div className="mock-avatar"></div>
        <span>{userName}</span>
        <div className="date">
          <div className="dot"></div>
          <span> {getDayWithMonthFromDate(post.createdAt)}</span>
        </div>
        <PostMenu />
      </div>
      <div className="container-images">
        <img src="" alt="" />
      </div>
      <p>{post.content}</p>
      <div className="container-post-actions">
        <PostActions />
        <div className="container-post-views">
          <PostViews />
        </div>
      </div>
      <div className="container-comments">
        <div className="comment">
          <div className="header-comment">
            <div className="avatar"></div>
            <span>mocknickname</span>
          </div>
          <div className="content">
            This text for comment. This is mock data.
          </div>
          <div className="footer-comment">
            <span className="date">1ч.</span>
            <span>ответить</span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <span>12</span>
            </div>
          </div>
        </div>
        <span className="show-comments">Показать остальные комментарии</span>
        <div className="add-comment-section">
          <input name="" id="" placeholder="Добавьте комментарий..."></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
