// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import BoxComponent from './Box';
import FlexComponent from './Flex';
import GridComponent from './Grid';

export default {
  title: 'Components/Primitives',
  component: BoxComponent,
  argTypes: {}
};

export const Box: React.FC = () => {
  return (
    <div>
      <BoxComponent as='p'>
        Contains background, border, layout, position, and space from{' '}
        <a href='https://styled-system.com/api' target='_blank' rel='noreferrer'>
          Styled System&lsquo;s API
        </a>
      </BoxComponent>
    </div>
  );
};

export const Flex: React.FC = () => {
  return (
    <div>
      <p>Based on the Box component. You can apply any flexbox properties on the Flex component.</p>
      <a href='https://styled-system.com/api#flexbox' target='_blank' rel='noreferrer'>
        List of applicable props
      </a>
      <FlexComponent justifyContent='space-between' mt='40px'>
        <span>Left</span>
        <span>right</span>
      </FlexComponent>
      <FlexComponent justifyContent='center' mt='8px'>
        <span>center</span>
      </FlexComponent>
    </div>
  );
};

export const Grid: React.FC = () => {
  return (
    <GridComponent justifyItems='center' alignContent='center' gridTemplateColumns='1fr 1fr' gridColumnGap='16px' style={{ backgroundColor: '#7645d9' }}>
      <BoxComponent
        style={{
          backgroundColor: '#1fc7d4',
          width: '300px',
          height: '300px'
        }}
      />
      <BoxComponent
        style={{
          backgroundColor: '#1fc7d4',
          width: '300px',
          height: '300px'
        }}
      />
    </GridComponent>
  );
};
