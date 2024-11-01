// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

const FlexLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > * {
    margin: 0 8px;
    margin-bottom: 32px;
    max-width: 31.5%;
    min-width: 280px;
    width: 100%;
  }
`;

export default FlexLayout;
