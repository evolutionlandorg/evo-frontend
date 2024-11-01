// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { Modal, Button, ModalProps, Flex } from 'components';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import tw from 'twin.macro';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useApostleHire } from 'hooks/useApostle';
import useToast from 'hooks/useToast';
import { parseUnits } from '@ethersproject/units';
import { day2Seconds } from 'utils/time';
import { bundleApi } from 'api';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { ETHERS_BIG_ZERO } from 'utils/bigNumber';
import { useTranslation } from 'react-i18next';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';

interface Props extends ModalProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

const StyledForm = styled(Flex)`
  ${tw`space-y-4 mb-4`}
`;

const RentApostleModal: React.FC<Props> = ({ title, onDismiss, tokenId, landId, ...props }) => {
  const { t } = useTranslation();
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const { toastSuccess, toastError } = useToast();

  const onChangePrice = (e) => {
    const { value } = e.target;
    setPrice(value);
  };

  const onChangeDuration = (e) => {
    const { value } = e.target;
    setDuration(value);
  };

  const landResourceAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'LAND_RESOURCE');
  const { handleApostleHire, pendingTx } = useApostleHire(landId);

  const confirmHire = useCallback(() => {
    let ethersPrice = ETHERS_BIG_ZERO;

    try {
      ethersPrice = parseUnits(price || '0', RING.decimals);
    } catch (error) {
      toastError('Error', 'Enter price error !');
      return;
    }

    if (ethersPrice.lt(parseUnits('1', RING.decimals))) {
      toastError('Error', 'Ental price per day, greater than 1 RING!');
      return;
    }

    if (day2Seconds(duration || '0').lt(604800)) {
      toastError('Error', 'Duration must be greater than 7 days!');
      return;
    }

    handleApostleHire(landResourceAddress, tokenId, ethersPrice.mul(EthersBigNumber.from(duration)), day2Seconds(duration).toString(), () => {
      onDismiss();
    });
  }, [RING.decimals, duration, handleApostleHire, landResourceAddress, onDismiss, price, toastError, tokenId]);

  return (
    <Modal title={title} onDismiss={onDismiss} {...props}>
      <StyledForm flexDirection='column'>
        <Form layout='vertical'>
          <Form.Item label={t('Price')} required tooltip={t(`Rental price per day, greater than 1`, { token: RING.symbol })}>
            <Input placeholder={t(`Rental price per day, greater than 1`, { token: RING.symbol })} suffix={RING.symbol} onChange={onChangePrice} />
          </Form.Item>
          <Form.Item label={t('Duration')} required tooltip={{ title: `${t('Greater than')} 7 ${t('days')}`, icon: <InfoCircleOutlined /> }}>
            <Input placeholder={`${t('Greater than')} 7 ${t('days')}`} suffix={t('Days')} onChange={onChangeDuration} />
          </Form.Item>
        </Form>
      </StyledForm>
      <Button scale='sm' onClick={confirmHire} isLoading={pendingTx}>
        {t('Confirm')}
      </Button>
    </Modal>
  );
};

export default React.memo<Props>(styled(RentApostleModal)``);
