// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/no-danger */

import React from 'react';
import { Button, ModalProps, Flex, Box, Text } from 'components';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';
import getThemeValue from 'utils/getThemeValue';
import { ModalBody, ModalContainer, ModalHeader, ModalTitle } from 'components/Modal';
import { useUserAcceptAlphaAgreement } from 'store/user/hooks';

const WalletWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const AlphaAgreementModal: React.FC<ModalProps> = ({ onDismiss = () => null }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [, acceptAlphaAgreement] = useUserAcceptAlphaAgreement();

  return (
    <ModalContainer minWidth='320px'>
      <ModalHeader background={getThemeValue('colors.gradients.bubblegum')(theme)}>
        <ModalTitle>
          <p>{t('Disclaimer')}</p>
        </ModalTitle>
      </ModalHeader>
      <ModalBody width={['320px', null, '340px']}>
        <WalletWrapper p='24px' maxHeight='453px' overflowY='auto'>
          <Flex className='space-y-3' flexDirection='column'>
            <Text>{t('Risk Warning')}：</Text>
            <p dangerouslySetInnerHTML={{ __html: t('Risk Warning_Content') }} />
            <Text>{t('Disclaimer')}：</Text>
            <p dangerouslySetInnerHTML={{ __html: t('Disclaimer_Content') }} />
            <Text>{t('User Commitment')}：</Text>
            <p dangerouslySetInnerHTML={{ __html: t('User Commitment_Content') }} />
            <p>{t('Accept Agreement')}</p>
          </Flex>
        </WalletWrapper>
        <Box p='24px'>
          <Button
            width='100%'
            onClick={() => {
              acceptAlphaAgreement();
              onDismiss();
            }}
          >
            {t('Confirm')}
          </Button>
        </Box>
      </ModalBody>
    </ModalContainer>
  );
};

export default AlphaAgreementModal;
