// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/no-danger */

import React from 'react';
import { Button, ModalProps, Flex, Box } from 'components';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';
import getThemeValue from 'utils/getThemeValue';
import { ModalBody, ModalContainer, ModalHeader, ModalTitle } from 'components/Modal';
import { useAcceptCrabXRING2XWRING } from 'store/user/hooks';

const WalletWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const CrabXRING2XWRINGModal: React.FC<ModalProps> = ({ onDismiss = () => null }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [, acceptCrabXRING2XWRING] = useAcceptCrabXRING2XWRING();

  return (
    <ModalContainer minWidth='320px'>
      <ModalHeader background={getThemeValue('colors.gradients.bubblegum')(theme)}>
        <ModalTitle>
          <p>{t('Important')}</p>
        </ModalTitle>
      </ModalHeader>
      <ModalBody width={['320px', null, '340px']}>
        <WalletWrapper p='24px' maxHeight='453px' overflowY='auto'>
          <Flex className='space-y-3' flexDirection='column'>
            <p dangerouslySetInnerHTML={{ __html: t('Crab XRING_XWRING_Content') }} />
          </Flex>
        </WalletWrapper>
        <Box p='24px'>
          <Button
            width='100%'
            onClick={() => {
              acceptCrabXRING2XWRING();
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

export default CrabXRING2XWRINGModal;
