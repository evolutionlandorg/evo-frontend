// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createAction } from '@reduxjs/toolkit';

export const toggleTheme = createAction<void>('user/toggleTheme');

export const acceptAlphaAgreement = createAction<void>('user/acceptAlphaAgreement');

export const acceptXRING2XWRING = createAction<void>('user/acceptXRING2XWRING');
