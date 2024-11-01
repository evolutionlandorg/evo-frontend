// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import backgroundImg from './img/search-bg.png';
import searchIcon from './img/search-icon.png';

interface Props {
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MarketSearch: React.FC<Props> = (props) => {
  const { onSubmit } = props;
  const [value, setValue] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      value && onSubmit && onSubmit(value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    value && onSubmit && onSubmit(value);
  };

  return (
    <div className={props.className}>
      <input onChange={handleChange} onKeyUp={handleKeyUp} placeholder={props.placeholder} type='text' value={value} />
      <button type='button' disabled={!value} onClick={handleClick} aria-label='search' />
    </div>
  );
};

export default React.memo<Props>(styled(MarketSearch)`
  align-items: center;
  background-image: url(${backgroundImg});
  background-size: 100% 100%;
  display: inline-flex;
  justify-content: flex-start;
  ${tw`px-3 py-1 h-7`}
  input {
    background: transparent;
    ${tw`w-32 text-white h-full`}
  }

  button {
    background-image: url(${searchIcon});
    background-size: 100% 100%;
    ${tw`w-5 h-4/5`}
    ${tw`disabled:cursor-not-allowed`}
    ${tw`opacity-100 transition duration-200`}
    ${tw`hover:opacity-80 active:opacity-50`}
  }
`);
