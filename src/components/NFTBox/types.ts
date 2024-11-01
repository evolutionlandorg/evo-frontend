// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BareProps } from 'components/types';
import { Apostle, Land } from 'hooks/backendApi';

export interface SpinnerProps {
  number?: string;
  subtitle?: string;
}

export type NFTStatus = 'apostle-breed' | 'apostle-mining' | 'apostle-pve' | 'apostle-pvp' | 'land-apostleworking' | 'land-drillworking';

export interface LandBoxProps extends BareProps {
  number: string;
  subtitle?: string;
  imageUrl: string;
  footerNode?: React.ReactChild;
  imageOnClick?: () => void;
  status?: NFTStatus[];
  hasTooltip?: boolean;
  land?: Land;
}

export interface ApostleBoxProps extends BareProps {
  number: string;
  subtitle?: string;
  imageUrl: string;
  footerNode?: React.ReactChild;
  imageOnClick?: () => void;
  status?: NFTStatus[];
  hasAdd?: boolean;
  hasTooltip?: boolean;
  apostle?: Apostle;
  boxSize?: number;
  pointer?: boolean;
}

export interface DrillBoxProps extends BareProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  footerNode?: React.ReactChild;
  imageOnClick?: () => void;
  status?: NFTStatus[];
  hasAdd?: boolean;
  boxSize?: number;
  pointer?: boolean;
}
