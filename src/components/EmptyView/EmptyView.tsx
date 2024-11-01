// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Flex } from 'components/Box';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

interface EmptyViewProps {
  /**
   * The notice text to display.
   * @default Empty
   */
  tips?: string;
  /**
   * The text to display on button. If empty, no button is displayed.
   * display
   */
  buttonText?: string;
  /**
   * The internal page to jump to when button is clicked.
   */
  link?: string;
  /**
   * Callback fired when button clicked. If link is also passed in, only jumps to the link provided.
   */
  onClick?: () => void;
  className?: string;
}

const EmptyIcon = styled.img`
  ${tw`mb-5`}

  height: 8.4357rem;
  width: 8.4357rem;
`;

const EmptyTips = styled(Text)`
  ${tw`mb-6`}

  overflow-wrap: break-word;
  text-align: center;
`;

const EmptyButton = styled(Button)`
  min-width: 8.4357rem;
`;

const EmptyView: FC<EmptyViewProps> = ({ tips = 'Empty', buttonText, link, onClick, children, className }) => {
  const { t } = useTranslation();
  const renderButton = useCallback(() => {
    if (!buttonText) {
      return null;
    }

    const button = (
      <EmptyButton onClick={onClick || undefined} scale='sm'>
        {buttonText}
      </EmptyButton>
    );

    if (link) {
      return <Link to={link}>{button}</Link>;
    }

    return button;
  }, [link, onClick, buttonText]);

  return (
    <>
      {children ?? (
        <Flex flex='1' height='100%' flexDirection='column' alignItems='center' justifyContent='center' className={className}>
          <EmptyIcon src='/images/layout/empty.png' />
          <EmptyTips>{t(tips)}</EmptyTips>
          {renderButton()}
        </Flex>
      )}
    </>
  );
};

export default EmptyView;
