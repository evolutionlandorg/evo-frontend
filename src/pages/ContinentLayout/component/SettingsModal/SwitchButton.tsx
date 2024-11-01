// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Flex, IconButton, useModal, AutoRenewIcon } from 'components';
import { History } from 'history';
import SwitchLandModal from './SwitchLandModal';

type Props = {
  color?: string;
  mr?: string;
  history: History;
};

const SwitchButton = ({ color, mr = '8px', history }: Props) => {
  const [onPresentSwitchLandModal] = useModal(<SwitchLandModal title='Choose a continent' history={history} />);

  return (
    <Flex>
      <IconButton onClick={onPresentSwitchLandModal} variant='text' scale='sm' mr={mr} id='open-settings-dialog-button'>
        <AutoRenewIcon height={24} width={24} color={color || 'textSubtle'} />
      </IconButton>
    </Flex>
  );
};

export default SwitchButton;
