// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BareProps } from 'components/types';
import { useHistory } from 'react-router-dom';
import cs from 'classnames';
import { useTranslation } from 'react-i18next';
import { Flex } from '../Box';
import { Button } from '../Button';
import { ArrowBackIcon } from '../Svg';
import { Text } from '../Text';

export interface Props extends BareProps {
  callback?: () => void;
}

const GoBack: React.FC<Props> = ({ className, callback }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const goBack = () => {
    if (callback) {
      callback();
    } else {
      history.goBack();
    }
  };

  return (
    <Flex className={cs(className, 'w-full')} alignItems='center'>
      <Button variant='text' area-label='go back' onClick={goBack} startIcon={<ArrowBackIcon color='primary' />}>
        <Text className='ml-1'>{t('Back')}</Text>
      </Button>
    </Flex>
  );
};

export default GoBack;
