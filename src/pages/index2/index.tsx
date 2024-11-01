// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface StateProps {
  name?: string;
}

const Index2: React.FC<StateProps> = (props = { name: 'Jay' }) => {
  const { name } = props;

  return <div>{`Hello ${name}, this is index2 page, welcome there!`}</div>;
};

export default Index2;
