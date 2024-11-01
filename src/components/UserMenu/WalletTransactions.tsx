// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Flex, Text } from 'components';
import { AppDispatch } from 'store';
import { isTransactionRecent, useAllTransactions } from 'store/transactions/hooks';
import { useTranslation } from 'react-i18next';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { clearAllTransactions } from 'store/transactions/actions';
import { orderBy } from 'lodash';
import { SUPPORTED_LANDS_INDEX } from 'types';
import TransactionRow from './TransactionRow';

interface Props {
  landId: SUPPORTED_LANDS_INDEX;
}

const WalletTransactions: React.FC<Props> = ({ landId }) => {
  const { chainId } = useActiveWeb3React(landId);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const allTransactions = useAllTransactions(landId);
  const sortedTransactions = orderBy(Object.values(allTransactions).filter(isTransactionRecent), 'addedTime', 'desc');

  const handleClearAll = () => {
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }));
    }
  };

  return (
    <Box minHeight='120px'>
      <Flex alignItems='center' justifyContent='space-between' mb='24px'>
        <Text color='secondary' fontSize='12px' textTransform='uppercase' fontWeight='bold'>
          {t('Recent Transactions')}
        </Text>
        {sortedTransactions.length > 0 && (
          <Button scale='sm' onClick={handleClearAll} variant='text' px='0'>
            {t('Clear all')}
          </Button>
        )}
      </Flex>
      {sortedTransactions.length > 0 ? sortedTransactions.map((txn) => <TransactionRow landId={landId} key={txn.hash} txn={txn} />) : <Text textAlign='center'>{t('No recent transactions')}</Text>}
    </Box>
  );
};

export default WalletTransactions;
