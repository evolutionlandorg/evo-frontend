// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BlockIcon, CheckmarkCircleIcon, Flex, Link, OpenNewIcon, RefreshIcon } from 'components';
import styled from 'styled-components';
import { TransactionDetails } from 'store/transactions/reducer';
import { getExplorerLink } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';

interface TransactionRowProps {
  landId: SUPPORTED_LANDS_INDEX;
  txn: TransactionDetails;
}

const TxnIcon = styled(Flex)`
  align-items: center;
  flex: none;
  width: 24px;
`;

const Summary = styled.div`
  flex: 1;
  font-size: 14px;
  padding: 0 6px;
`;

const TxnLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  margin-bottom: 16px;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`;

const renderIcon = (txn: TransactionDetails) => {
  if (!txn.receipt) {
    return <RefreshIcon spin width='24px' />;
  }

  return txn.receipt?.status === 1 || typeof txn.receipt?.status === 'undefined' ? <CheckmarkCircleIcon color='success' width='24px' /> : <BlockIcon color='failure' width='24px' />;
};

const TransactionRow: React.FC<TransactionRowProps> = ({ landId, txn }) => {
  if (!txn) {
    return null;
  }

  return (
    <TxnLink href={getExplorerLink(landId, txn.hash, 'transaction')} external>
      <TxnIcon>{renderIcon(txn)}</TxnIcon>
      <Summary>{txn.summary ?? txn.hash}</Summary>
      <TxnIcon>
        <OpenNewIcon width='24px' color='primary' />
      </TxnIcon>
    </TxnLink>
  );
};

export default TransactionRow;
