// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Toast } from 'components/Toast';

type ToastSignature = (title: Toast['title'], description?: Toast['description']) => void;
export interface ToastContextApi {
  toasts: Toast[];
  clear: () => void;
  remove: (id: string) => void;
  toastError: ToastSignature;
  toastInfo: ToastSignature;
  toastSuccess: ToastSignature;
  toastWarning: ToastSignature;
}
