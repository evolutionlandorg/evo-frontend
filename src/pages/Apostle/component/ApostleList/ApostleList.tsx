// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BareProps } from 'components/types';
import { ApostleBoxMini } from 'components';
import { BasicApostle } from 'hooks/backendApi/types';

export interface Props extends BareProps {
  list: BasicApostle[];
  onClick?: (x: string) => void;
}

const StyledApostleList = styled.div`
  ${tw`flex space-x-5`}

`;

const ApostleList: React.FC<Props> = ({ className, list, onClick }) => {
  return (
    <StyledApostleList className={className}>
      {list.map((apostle) => {
        if (!apostle || !apostle.token_id) {
          return null;
        }

        return (
          <ApostleBoxMini
            key={apostle.token_id}
            number={`${apostle.token_index || ''}`}
            subtitle=''
            imageUrl={apostle.apostle_picture}
            imageOnClick={() => {
              onClick && onClick(apostle.token_id);
            }}
          />
        );
      })}
    </StyledApostleList>
  );
};

export default ApostleList;
