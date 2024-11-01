// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo, useState } from 'react';
import { Modal, ModalProps, Flex, Erc721ApproveButton } from 'components';
import styled from 'styled-components';
import { bundleApi } from 'api';
import { SUPPORTED_LANDS_INDEX } from 'types';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { extendLandId } from 'utils';

interface Props extends ModalProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
  spenderAddess: string;
}

const ApproveDrillModal: React.FC<Props> = ({ title, onDismiss, tokenId, landId, spenderAddess, ...props }) => {
  const drillContractAddress = useMemo(() => bundleApi[landId].getAddressByName(extendLandId(landId), 'OBJECTOWNERSHIP'), [landId]);
  const { library, account } = useActiveWeb3React(landId);

  return (
    <Modal title={title || 'Approve NFT'} onDismiss={onDismiss} {...props}>
      {/* <Text>Approve NFT</Text> */}
      <Erc721ApproveButton scale='sm' landId={landId} from={account} provider={library} tokenContractAddress={drillContractAddress} spenderAddress={spenderAddess} tokenId={tokenId}>
        Approved Success
      </Erc721ApproveButton>
    </Modal>
  );
};

export default React.memo<Props>(styled(ApproveDrillModal)``);
