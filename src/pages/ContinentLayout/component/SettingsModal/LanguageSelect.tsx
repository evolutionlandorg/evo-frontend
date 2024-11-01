// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import { BareProps } from 'components/types';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LNGS } from 'config/constants';

const { Option } = Select;

const StyledLanguage = styled.div`
  align-items: center;
`;

const LanguageSelect: React.FC<BareProps> = ({ className }) => {
  const { i18n, t } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <StyledLanguage className={className}>
      <Select style={{ width: 100 }} onChange={handleChange} defaultValue={i18n.language}>
        {SUPPORTED_LNGS.map((lng) => (
          <Option key={lng} value={lng}>
            {t(lng as unknown as TemplateStringsArray)}
          </Option>
        ))}
      </Select>
    </StyledLanguage>
  );
};

export default LanguageSelect;
