// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SUPPORTED_LANDS_INDEX, Token } from 'types';
import { Flex, Text, NumericalInput, SelectResources, QuestionHelper, FurnacePreviewIcon } from 'components';
import { StyledFontTitle } from 'ui/styled';
import clamp from 'lodash/clamp';
import { useTranslation } from 'react-i18next';

const StyledTitle = styled(StyledFontTitle)`
  ${tw`text-base`}
`;

const Wrapper = styled.div`
  ${tw`w-full p-5 space-y-5`}

  display: flex;
  flex-direction: column;
  max-width: 24.375rem;
`;

const Preview = styled(Flex)`
  justify-content: space-between;
`;

const ColumnBox = styled(Flex)`
  ${tw`space-y-3.5`}

  flex-direction: column;
`;

const SuccessRateHelper = styled(QuestionHelper)`
  ${tw`ml-2`}
`;

interface PanelProps {
  title: string;
  previewData?: PreviewItem[];
  successRate: string | number;
  landId?: SUPPORTED_LANDS_INDEX;
  chainId?: number;
  enableResourcesSelect?: boolean;
  enableQuantityInput?: boolean;
  resource?: string;
  quantity?: string | number;
  onResourceSelect?: (resource: Token) => void;
  onQuantityInput?: (quantity: string) => void;
}

export interface PreviewItem {
  label: string;
  preValue?: number | string;
  curValue?: number | string;
}

export const MAX_QUANTITY = 10;

export const PreviewPanel: React.FC<PanelProps> = ({ title, successRate, previewData = [], enableResourcesSelect = false, enableQuantityInput = false, resource, quantity, landId, chainId, onResourceSelect, onQuantityInput, children }) => {
  const { t } = useTranslation();

  const renderPreview = () => {
    if (!previewData.length) {
      return null;
    }

    const preValues = [];
    const curValues = [];

    previewData.forEach(({ label, preValue, curValue }) => {
      preValues.push(
        <Text key={`pre${label}`}>
          {label}: {preValue > 0 ? `+${preValue}` : preValue}
        </Text>
      );
      curValue && curValues.push(<Text key={`cur${label}`}>{curValue}</Text>);
    });

    return (
      <Preview>
        <div>{preValues}</div>
        {!!curValues.length && (
          <>
            <FurnacePreviewIcon />
            <div>{curValues}</div>
          </>
        )}
      </Preview>
    );
  };

  const handleUserInput = (value: string) => {
    let val = value;
    if (!/\d+/.test(value)) {
      val = val.replace(/[^\d]+/g, '');
    }

    let num: number | string = Number.parseInt(val, 0);
    if (Number.isNaN(num)) {
      num = '';
    } else {
      num = clamp(num, 0, MAX_QUANTITY);
    }

    onQuantityInput && onQuantityInput(num.toString());
  };

  return (
    <Wrapper>
      <StyledTitle>{title}</StyledTitle>
      {successRate && (
        <Flex>
          <Text>
            {t('furnace:Success Rate')}: {successRate}%
          </Text>
          <SuccessRateHelper size='1.25rem' text={t('furnace:Success Rate Tip')} />
        </Flex>
      )}
      {renderPreview()}
      {enableResourcesSelect && (
        <ColumnBox>
          <StyledTitle>{t('furnace:Select Element')}</StyledTitle>
          <SelectResources landId={landId} chainId={chainId} value={resource} onChange={(value) => onResourceSelect && onResourceSelect(value)} />
        </ColumnBox>
      )}
      {enableQuantityInput && (
        <ColumnBox>
          <StyledTitle>{t('furnace:Please enter the quantity')}</StyledTitle>
          <NumericalInput value={quantity} onUserInput={handleUserInput} placeholder={t('furnace:Quantity')} title={t('furnace:The quantity to forge')} pattern='\d' />
        </ColumnBox>
      )}
      {children}
    </Wrapper>
  );
};
