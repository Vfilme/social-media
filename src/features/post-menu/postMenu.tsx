import './postMenu.scss';
import React from 'react';

export const PostMenu: React.FC = () => {
  return (
    <div className="post-menu">
      <svg viewBox="0 0 23 5">
        <circle r="2.4" cx="3" cy="2.5"></circle>
        <circle r="2.4" cx="11.5" cy="2.5"></circle>
        <circle r="2.4" cx="20" cy="2.5"></circle>
      </svg>
    </div>
  );
};
