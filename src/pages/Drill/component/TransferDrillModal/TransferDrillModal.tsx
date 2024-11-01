// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { Modal, Button, ModalProps, Flex } from 'components';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import tw from 'twin.macro';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useDrillTransfer } from 'hooks/useDrill';
import useToast from 'hooks/useToast';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTranslation } from 'react-i18next';

interface Props extends ModalProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

const StyledForm = styled(Flex)`
  ${tw`space-y-4 mb-4`}
`;

const TransferDrillModal: React.FC<Props> = ({ title, onDismiss, tokenId, landId, ...props }) => {
  const [to, setTo] = useState('');
  const { account } = useActiveWeb3React(landId);
  const { t } = useTranslation();

  const { toastError } = useToast();
  const onChangeTo = (e) => {
    const { value } = e.target;
    setTo(value);
  };

  const { handleDrillTransfer, pendingTx } = useDrillTransfer(landId, account, to, tokenId, () => {
    onDismiss();
  });

  const confirmTransfer = useCallback(() => {
    if (!to) {
      toastError(t('Error'), t('error.Enter_recipient_address'));
      return;
    }
    handleDrillTransfer();
  }, [handleDrillTransfer, to, toastError, t]);

  return (
    <Modal title={title} onDismiss={onDismiss} {...props}>
      <StyledForm flexDirection='column'>
        <Form layout='vertical'>
          <Form.Item label={t('Recipient')} required tooltip={t('Recipient address')}>
            <Input placeholder={t('Recipient address')} onChange={onChangeTo} />
          </Form.Item>
        </Form>
      </StyledForm>
      <Button scale='sm' onClick={confirmTransfer} isLoading={pendingTx}>
        {t('Confirm')}
      </Button>
    </Modal>
  );
};

export default React.memo<Props>(styled(TransferDrillModal)``);
