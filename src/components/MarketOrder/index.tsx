// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import arrowDown from './img/arrow-down.png';
import arrowUp from './img/arrow-up.png';

export interface OrderItem {
  key: string | number;
  text: string;
}

interface Props {
  onSelect?: (value: OrderItem) => void;
  label: string;
  items: OrderItem[];
  className?: string;
}

const MarketOrder: React.FC<Props> = (props) => {
  const { items, label, onSelect, className } = props;

  const [expand, setExpand] = React.useState<boolean>(false);
  const [defaultExpand, setDefaultExpand] = React.useState<boolean>(false);

  const handleClick = () => {
    setExpand((prev) => !prev);
    setDefaultExpand(true);
  };

  return (
    <div className={className}>
      <div className='control' onClick={handleClick} role='button' tabIndex={0}>
        <div className='label'>{label}</div>
        <div className={`arrow ${expand ? 'up' : 'down'}`} />
      </div>
      <div className={`items ${defaultExpand ? '' : 'hidden'} ${expand ? 'animate-visible-slow' : 'animate-invisible-slow'}`}>
        {items.map((item) => (
          <button
            type='button'
            className='item'
            key={item.key}
            onClick={() => {
              onSelect && onSelect(item);
            }}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo<Props>(styled(MarketOrder)`
  position: relative;

  .control {
    ${tw`opacity-100 transition duration-200`}
    ${tw`inline-flex justify-start items-center cursor-pointer hover:opacity-80 active:opacity-50 space-x-0 h-7`}
  }

  .label {
    background-size: 100% 100%;
    ${tw`px-2 h-8  text-white inline-flex justify-center items-center`}
  }

  .arrow {
    ${tw`w-8 h-8`}

    background-size: 100% 100%;

    &.up {
      background-image: url(${arrowUp});
    }

    &.down {
      background-image: url(${arrowDown});
    }
  }

  .items {
    background-color: rgba(0, 0, 0, 0.7);
    left: 3px;
    width: calc(100% - 6px);
    ${tw`absolute mt-1 rounded-t-md rounded-b-xl px-2 py-3`}
    .item {
      ${tw`text-sm text-white font-medium`}
      ${tw`opacity-100 transition duration-200`}
      ${tw`my-1 transform hover:opacity-80 hover:scale-105 active:opacity-50 active:scale-100`}
    }
  }
`);
