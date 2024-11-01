// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { Modal, Button, ModalProps, Box } from 'components';
import styled from 'styled-components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { SUPPORTED_LANDS_INDEX, Token } from 'types';
import { useTranslation } from 'react-i18next';
import SelectResourcesRadio from './SelectResourcesRadio';

interface Props extends ModalProps {
  landId?: SUPPORTED_LANDS_INDEX;
  handleResourceSelected?: (resource: Token) => void;
  tip?: React.ReactNode;
}

const SelectResourcesModal: React.FC<Props> = ({ title, onDismiss, landId, handleResourceSelected, tip, ...props }) => {
  const { t } = useTranslation();
  const [resourceSelect, setResourceSelect] = useState(null);
  const { chainId } = useActiveWeb3React(landId);

  return (
    <Modal title={title} onDismiss={onDismiss} {...props}>
      {tip}
      <Box>
        <SelectResourcesRadio landId={landId} chainId={chainId} value={resourceSelect?.symbol} onChange={setResourceSelect} />
      </Box>
      <Button
        mt='4'
        scale='sm'
        onClick={() => {
          handleResourceSelected(resourceSelect);
          onDismiss();
        }}
        disabled={!resourceSelect}
      >
        {t('Confirm Select')} {resourceSelect?.symbol}
      </Button>
    </Modal>
  );
};

export default styled(SelectResourcesModal)``;
