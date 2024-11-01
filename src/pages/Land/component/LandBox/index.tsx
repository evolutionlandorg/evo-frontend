// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { breakpoints } from 'config/breakpoints';
import { ContinentSerialEnum } from 'config/continents';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import backgroundImg from './img/bg.png';
import locationImg from './img/location.svg';
import numberImg from './img/number.svg';

interface Props {
  landImgUrl: string;
  landNumber: number;
  landSerial: ContinentSerialEnum;
  landLocation: {
    gx: number;
    gy: number;
  };
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const LandBox: React.FC<Props> = (props) => {
  const { landLocation, landNumber, landSerial, onClick } = props;

  return (
    <div className={props.className}>
      <button className='mb-2 card' onClick={onClick} type='button'>
        <img alt='...' loading='lazy' src={props.landImgUrl} />
      </button>
      <div className='flex justify-start items-center pl-1 tablet:pl-3 space-x-4 tablet:space-x-6'>
        <div className='flex items-center space-x-0'>
          <img alt='...' className='location-icon' src={locationImg} />
          <span className='location-text'>
            {landLocation.gx},{landLocation.gy}
          </span>
        </div>
        <div className='flex items-center space-x-0'>
          <img alt='...' className='numberno-icon' src={numberImg} />
          <span className='numberno-text'>
            {landSerial}
            {landNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo<Props>(styled(LandBox)`
  height: fit-content;
  width: fit-content;

  .card {
    align-items: center;
    background-image: url(${backgroundImg});
    background-size: 100% 100%;
    display: flex;
    height: 48vw;
    justify-content: center;
    width: 47vw;

    img {
      width: 30vw;
    }

    @media screen and (min-width: ${breakpoints.tablet}) {
      height: 256px;
      width: 256px;

      img {
        width: 140px;
      }
    }
  }

  .location-icon,
  .numberno-icon {
    height: 5vw;
    width: 5vw;

    @media screen and (min-width: ${breakpoints.tablet}) {
      height: 20px;
      width: 20px;
    }
  }

  .location-text,
  .numberno-text {
    ${tw`text-white`}

    font-size: 4vw;

    @media screen and (min-width: ${breakpoints.tablet}) {
      ${tw`text-base`}
    }
  }
`);
