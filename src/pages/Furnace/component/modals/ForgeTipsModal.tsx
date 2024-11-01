// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Checkbox } from 'antd';
import { Flex, Modal, ModalProps, Text, Button } from 'components';
import React, { useState } from 'react';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled(Flex)`
  ${tw`space-y-8`}

  flex-direction: column;
`;

const Content = styled(Text)`
  ${tw`text-lg mt-5`}
`;

interface ForgeTipsModalProps extends Omit<ModalProps, 'title'> {
  className?: string;
  onClick: () => void;
}

const EVOLUTION_LAND_FORGE_TIPS_CHECKED_STORAGE_KEY = 'EVOLUTION_LAND_FORGE_TIPS_CHECKED';

export const hasTipsChecked = () => localStorage.getItem(EVOLUTION_LAND_FORGE_TIPS_CHECKED_STORAGE_KEY) === 'true';

export function ForgeTipsModal({ onDismiss, onClick, ...props }: ForgeTipsModalProps) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    checked && localStorage.setItem(EVOLUTION_LAND_FORGE_TIPS_CHECKED_STORAGE_KEY, checked.toString());
    onClick();
    onDismiss && onDismiss();
  };

  return (
    <Modal title={t('Tips')} onDismiss={onDismiss} {...props}>
      <Container>
        <Content>{t('furnace:Forge Tips Content')}</Content>
        <Checkbox onChange={(e) => setChecked(e.target.checked)}>{t('furnace:Forge Tips Checkbox')}</Checkbox>
        <Button scale='sm' onClick={handleClick}>
          {t('Confirm')}
        </Button>
      </Container>
    </Modal>
  );
}
