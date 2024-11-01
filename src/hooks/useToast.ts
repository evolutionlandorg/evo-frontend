// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useContext } from 'react';
import { ToastsContext } from 'contexts/ToastsContext';

const useToast = () => {
  const toastContext = useContext(ToastsContext);

  if (toastContext === undefined) {
    throw new Error('Toasts context undefined');
  }

  return toastContext;
};

export default useToast;
