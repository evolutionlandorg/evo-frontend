// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect } from 'react';
import useToast from 'hooks/useToast';
import { Text, Flex, Link } from 'components';
import { PopupWindow, PopupHeader } from 'components/PopupWindow';

interface StateProps {
  name?: string;
  className?: string;
}

const Index: React.FC<StateProps> = ({ name, className }) => {
  const { toastError, toastSuccess } = useToast();

  useEffect(() => {
    toastSuccess(
      'Transaction receipt',
      <Flex flexDirection='column'>
        <Text>test</Text>
      </Flex>
    );
    toastSuccess(
      'Transaction receipt1',
      <Flex flexDirection='column'>
        <Text>test</Text>
      </Flex>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const { name, className } = props;
  return <PopupWindow className={className}>{`Hello ${name}, this is index page, welcome there!`} Test Page</PopupWindow>;
};

export default React.memo(Index);
