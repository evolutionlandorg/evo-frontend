// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';
import { Modal, Button, ModalProps, Flex, Erc20ApproveButton, Text } from 'components';
import styled from 'styled-components';
import { Form, Radio } from 'antd';
import tw from 'twin.macro';
import { useApostleBornWithEnhance } from 'hooks/useApostle';
import { parseUnits } from '@ethersproject/units';
import { extendLandId } from 'utils';
import { BigNumber as EthersBigNumber } from 'ethers';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { Element, SUPPORTED_LANDS_INDEX } from 'types';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { bundleApi } from 'api';
import { ethersToBigNumber } from 'utils/bigNumber';
import { useTranslation } from 'react-i18next';
import { getIsSupportByModuleName } from 'config';

interface Props extends ModalProps {
  motherTokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

type ElementOption = { value: Element; label: string };

const StyledForm = styled(Flex)`
  ${tw`space-y-4 mb-4`}
`;

const elementOptions: ElementOption[] = [
  { value: 'gold', label: 'Gold' },
  { value: 'wood', label: 'WOOD' },
  { value: 'water', label: 'WATER' },
  { value: 'fire', label: 'FIRE' },
  { value: 'soil', label: 'SOIL' }
];

const elementLevelOptions = [
  { value: '1', label: 'Lv.1' },
  { value: '2', label: 'Lv.2' },
  { value: '3', label: 'Lv.3' }
];

const levelUnitPrice = parseUnits('5');

const BirthApostleModal: React.FC<Props> = ({ title, onDismiss, motherTokenId, landId, ...props }) => {
  const { t } = useTranslation();
  const [element, setElement] = useState<Element>('gold');
  const [elementLevel, setElementLevel] = useState('1');
  const { library, account, chainId } = useActiveWeb3React(landId);

  // const { handleApostleBorn, pendingTx: handleApostleBornPendingTx } = useApostleBorn(landId, motherTokenId, () => {
  //   onDismiss()
  // });

  const { handleApostleBornWithEnhance, pendingTx: handleApostleBornWithEnhancePendingTx } = useApostleBornWithEnhance(landId, motherTokenId, element, parseInt(elementLevel), levelUnitPrice, () => {
    onDismiss();
  });

  const onChangeElement = (e) => {
    const { value } = e.target;
    setElement(value);
  };

  const onChangeElementLevel = (e) => {
    const { value } = e.target;
    setElementLevel(value);
  };

  const apostleBaseAddress = useMemo(() => bundleApi[landId].getAddressByName(extendLandId(landId), 'APOSTLE_BASE'), [landId]);
  const resourceTokenAddress = useMemo(() => bundleApi[landId].getAddressByName(extendLandId(landId), `ELEMENT_${element.toUpperCase()}`), [landId, element]);

  const elementNeed = useMemo(() => levelUnitPrice.mul(EthersBigNumber.from(elementLevel)), [elementLevel]);

  return (
    <Modal title={title} onDismiss={onDismiss} {...props}>
      <StyledForm flexDirection='column'>
        <Form layout='vertical'>
          <Form.Item label={t('Select Resource Preference')} required>
            <Radio.Group optionType='button' buttonStyle='solid' options={elementOptions} value={element} onChange={onChangeElement} />
          </Form.Item>
          <Form.Item label={t('Select Level')} required>
            <Radio.Group optionType='button' buttonStyle='solid' options={elementLevelOptions} value={elementLevel} onChange={onChangeElementLevel} />
          </Form.Item>
          <Form.Item label={t('Total')}>
            <Text>
              {getFullDisplayBalance(ethersToBigNumber(elementNeed))} {element.toUpperCase()}
            </Text>
          </Form.Item>
        </Form>
      </StyledForm>
      <Flex alignItems='center' justifyContent='space-between' mb='16px'>
        <Erc20ApproveButton skip={getIsSupportByModuleName(landId, 'RING_TOKENFALLBACK')} scale='sm' landId={landId} from={account} provider={library} tokenContractAddress={resourceTokenAddress} spenderAddress={apostleBaseAddress} amountToUse={levelUnitPrice.mul(EthersBigNumber.from(elementLevel)).toString()}>
          <Button scale='sm' onClick={handleApostleBornWithEnhance} isLoading={handleApostleBornWithEnhancePendingTx}>
            {t('Enhance')}
          </Button>
        </Erc20ApproveButton>
        {/* <Button scale="sm" variant="tertiary" onClick={handleApostleBorn} isLoading={pendingTx}>
          Skip Enhance and Claim
        </Button> */}
      </Flex>
    </Modal>
  );
};

export default React.memo<Props>(styled(BirthApostleModal)``);
