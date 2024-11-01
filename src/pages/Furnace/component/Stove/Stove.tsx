// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Flex } from 'components';
import { Position, StoveSlot, StoveSlotProps } from './StoveSlot';
import ImageStoveDisassemble from './stove-bg-disassemble.svg';
import ImageStoveUpgrade from './stove-bg-upgrade.svg';

const bgMap = {
  upgrade: ImageStoveUpgrade,
  dismantle: ImageStoveDisassemble
} as const;

export type BgMap = keyof typeof bgMap;

const MAX_SLOT_LENGTH = 6;
const ROTATION = 360 / MAX_SLOT_LENGTH;

const Background = styled.div<{ bg: string }>`
  align-items: center;
  background: ${({ bg }) => `url(${bgMap[bg]}) `} top center no-repeat;
  display: flex;
  height: fit-content;
  justify-content: center;
  padding-top: 100%;
  position: relative;
  width: 100%;
`;

const Wrapper = styled(Flex)`
  height: 68%;
  left: 16%;
  position: absolute;
  top: 16%;
  width: 68%;
`;

const Slots = styled.ul`
  ${tw`w-full h-full`}
`;

const SlotWrapper = styled.li<{ deg: number }>`
  display: inline-block;
  position: absolute;
  width: 20%;
  height: 20%;
  transform-origin: 250% 250%;

  ${({ deg }) => `
    transform: rotate(${46 + deg}deg) translate(60%, 60%);

    & > * {
      transform: rotate(-${46 + deg}deg);
    }
  `}
`;

const Launcher = styled(StoveSlot)`
  border-radius: ${({ theme }) => theme.radii.default};
  height: 22%;
  position: absolute;
  width: 22%;
`;
interface StoveProps {
  bg: BgMap;
  launcherImg?: string;
  onLaunch: () => void;
  slots?: StoveSlotProps[];
}

export function Stove({ bg, onLaunch, launcherImg, slots }: StoveProps) {
  const slotData: StoveSlotProps[] = [...slots, ...new Array(MAX_SLOT_LENGTH - slots.length).fill({})];

  return (
    <Background bg={bg}>
      <Wrapper alignItems='center' justifyContent='center'>
        <Slots>
          {slotData.map(({ disabled = true, ...props }, index) => {
            const { top, right, bottom, left } = Position;
            const position = [top, right, right, bottom, left, left];
            return (
              <SlotWrapper key={index} deg={index * ROTATION}>
                <StoveSlot disabled={disabled} position={position[index]} {...props} />
              </SlotWrapper>
            );
          })}
        </Slots>
        <Launcher src={launcherImg} selectable onClick={onLaunch} />
      </Wrapper>
    </Background>
  );
}
