// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, ModalProps, Flex, Input } from 'components';
import { parseUnits } from 'ethers/lib/utils';
import styled from 'styled-components';
import { Form } from 'antd';
import tw from 'twin.macro';
import { useErc20TokenTransfer } from 'hooks/useErc20Token';
import useToast from 'hooks/useToast';
import { Token, SUPPORTED_LANDS_INDEX } from 'types';
import { useTranslation } from 'react-i18next';

type Handler = (address: string) => boolean;

interface Props extends ModalProps {
  landId: SUPPORTED_LANDS_INDEX;
  token: Token;
  addressChecker?: Handler;
}

const StyledForm = styled(Flex)`
  ${tw`space-y-4 mb-4`}
`;

const TransferTokenModal: React.FC<Props> = ({ title, onDismiss, token, landId, addressChecker, ...props }) => {
  const { t } = useTranslation();
  const [wad, setWad] = useState('');
  const [to, setTo] = useState('');

  const { toastError } = useToast();

  const onChangeTo = (e) => {
    const { value } = e.target;
    setTo(value);
  };

  const onChangeWad = (e) => {
    const { value } = e.target;
    setWad(value);
  };

  const { handleErc20TokenTransfer, pendingTx } = useErc20TokenTransfer(landId, () => {
    onDismiss();
  });

  const confirmTransfer = useCallback(() => {
    if (!to) {
      toastError('Error', 'Enter recipient address !');
      return;
    }

    if (!wad) {
      toastError('Error', 'Enter transfer amount !');
      return;
    }

    if (addressChecker) {
      const valid = addressChecker(to);
      if (!valid) {
        toastError('Error', 'Enter valid address !');
        return;
      }
    }

    handleErc20TokenTransfer(token, to, parseUnits(wad, token.decimals).toString());
  }, [addressChecker, handleErc20TokenTransfer, to, toastError, token, wad]);

  return (
    <Modal title={title} onDismiss={onDismiss} {...props}>
      <StyledForm flexDirection='column'>
        <Form layout='vertical'>
          <Form.Item label={t('Recipient')} required tooltip={t('Recipient address')}>
            <Input placeholder={t('Recipient address')} onChange={onChangeTo} />
          </Form.Item>
          <Form.Item label={t('Amount')} required tooltip={t('Transfer amount')}>
            <Input placeholder={t('Transfer amount')} onChange={onChangeWad} />
          </Form.Item>
        </Form>
      </StyledForm>
      <Button onClick={confirmTransfer} isLoading={pendingTx} scale='sm'>
        {t('Confirm')}
      </Button>
    </Modal>
  );
};

export default React.memo<Props>(styled(TransferTokenModal)``);
