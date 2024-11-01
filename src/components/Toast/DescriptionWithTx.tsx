// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Link } from 'components';
import { truncateHash, getExplorerLink } from 'utils';
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANDS_INDEX } from 'types';

interface DescriptionWithTxProps {
  landId: SUPPORTED_LANDS_INDEX;
  description?: string;
  txHash?: string;
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ landId, txHash, children }) => {
  // const { chainId } = useActiveWeb3React()
  const { t } = useTranslation();

  return (
    <>
      {typeof children === 'string' ? <p>{children}</p> : children}
      {txHash && (
        <Link external href={getExplorerLink(landId, txHash, 'transaction')}>
          {t('View on Explorer')}: {truncateHash(txHash, 8, 0)}
        </Link>
      )}
    </>
  );
};

export default DescriptionWithTx;
