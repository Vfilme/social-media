import React from 'react';
import { StatusIcons } from './types';
import './statusMessageIcon.scss';

interface Props {
  status: string;
}

export const StatusMessageIcon: React.FC<Props> = ({ status }) => {
  switch (status) {
    case StatusIcons.Sending:
      return (
        <svg>
          <circle className="ring-circle" cx="10" cy="10" r="5" />
          <circle className="ring-slider" cx="10" cy="10" r="1.5" />
        </svg>
      );
    case StatusIcons.Sent:
      return (
        <svg>
          <path d="M4 12l3 3l7 -7" />
        </svg>
      );
    case StatusIcons.Read:
      return (
        <svg>
          <path d="M2 12l3 3l7 -7" />
          <path d="M10 14l1 1l7 -7" />
        </svg>
      );
  }
};
