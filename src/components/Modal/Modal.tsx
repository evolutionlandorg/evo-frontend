// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from './styles';
import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({ title, onDismiss, onBack, children, hideCloseButton = false, bodyPadding = '24px', headerBackground = 'transparent', minWidth = '320px', ...props }) => {
  return (
    <ModalContainer minWidth={minWidth} {...props}>
      <ModalHeader background={headerBackground}>
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <p>{title}</p>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default Modal;
