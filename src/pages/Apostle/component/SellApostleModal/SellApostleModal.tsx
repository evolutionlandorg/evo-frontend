// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useCallback } from 'react';
import { Modal, Button, ModalProps, Flex } from 'components';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import tw from 'twin.macro';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useApostleAskWithToken } from 'hooks/useApostle';
import { parseUnits } from '@ethersproject/units';
import { day2Seconds } from 'utils/time';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { ETHERS_BIG_ZERO } from 'utils/bigNumber';
import useToast from 'hooks/useToast';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

interface Props extends ModalProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

const StyledForm = styled(Flex)`
  ${tw`space-y-4 mb-4`}
`;

const SellApostleModal: React.FC<Props> = ({ title, onDismiss, tokenId, landId, ...props }) => {
  const { RING } = LandConfig[extendLandId(landId)].tokens;
  const { t } = useTranslation();
  const { toastError } = useToast();

  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [duration, setDuration] = useState('');

  const onChangeStartPrice = (e) => {
    const { value } = e.target;
    setStartPrice(value);
  };

  const onChangeEndPrice = (e) => {
    const { value } = e.target;
    setEndPrice(value);
  };

  const onChangeDuration = (e) => {
    const { value } = e.target;
    setDuration(value);
  };

  const { handleApostleAskWithToken, pendingTx } = useApostleAskWithToken(landId);

  const confirmSellApostle = useCallback(() => {
    if (!startPrice) {
      toastError('Error', 'Enter start price !');
      return;
    }

    if (!endPrice) {
      toastError('Error', 'Enter end price !');
      return;
    }

    let ethersStartPrice = ETHERS_BIG_ZERO;
    let ethersEndPrice = ETHERS_BIG_ZERO;

    try {
      ethersStartPrice = parseUnits(startPrice || '0', RING.decimals);
      ethersEndPrice = parseUnits(endPrice || '0', RING.decimals);
    } catch (error) {
      toastError('Error', 'Enter price error !');
      return;
    }

    try {
      if (new BigNumber(duration).lt(0.1)) {
        toastError('Error', 'Duration: No less than 0.1 !');
        return;
      }
    } catch (error) {
      toastError('Error', 'Enter duration error !');
    }

    if (ethersStartPrice.lt(parseUnits('1', RING.decimals)) && ethersEndPrice.lt(parseUnits('1', RING.decimals))) {
      toastError('Error', `Enter price > 1 ${RING.symbol}!`);
      return;
    }

    handleApostleAskWithToken(tokenId, ethersStartPrice, ethersEndPrice, day2Seconds(duration).toString(), () => {
      onDismiss();
    });
  }, [RING.decimals, RING.symbol, duration, endPrice, handleApostleAskWithToken, onDismiss, startPrice, toastError, tokenId]);

  return (
    <Modal title={title} onDismiss={onDismiss} {...props}>
      <StyledForm flexDirection='column'>
        <Form layout='vertical'>
          <Form.Item label={t('Starting')} required tooltip={`${t('Greater than')} 1 ${RING.symbol}`}>
            <Input placeholder={`${t('No less than')} 1 ${RING.symbol}`} suffix={RING.symbol} onChange={onChangeStartPrice} />
          </Form.Item>
          <Form.Item label={t('Ending')} required tooltip={`${t('Greater than')} 1 ${RING.symbol}`}>
            <Input placeholder={`${t('No less than')} 1 ${RING.symbol}`} suffix={RING.symbol} onChange={onChangeEndPrice} />
          </Form.Item>
          <Form.Item label={t('Duration')} required tooltip={`${t('Greater than')} 0.1 days`}>
            <Input placeholder={`${t('Greater than')} 0.1 ${t('Days')}`} suffix={t('Days')} onChange={onChangeDuration} />
          </Form.Item>
        </Form>
      </StyledForm>
      <Button scale='sm' onClick={confirmSellApostle} isLoading={pendingTx}>
        {t('Confirm')}
      </Button>
    </Modal>
  );
};

export default React.memo<Props>(styled(SellApostleModal)``);
