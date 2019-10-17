import React from 'react';

import './Button.css';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  text: string;
  type: 'play' | 'save';
  style?: any,
}

export default ({
  disabled = false,
  onClick,
  text,
  type,
  style = {},
}: Props) => (
  <span
    className={`button ${type} ${disabled ? 'disabled' : ''}`}
    onClick={onClick}
    style={style}
  >
    {text}
  </span>
);
