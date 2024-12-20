// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable react/static-property-placement */
/* eslint-disable react/state-in-constructor */

import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface CountdownProps {
  readonly count?: number;
  readonly children?: React.ReactElement<any>;
  readonly onComplete?: () => void;
}

interface CountdownState {
  readonly count: number;
}

export default class Countdown extends React.Component<CountdownProps, CountdownState> {
  static propTypes = {
    count: PropTypes.number,
    children: PropTypes.element,
    onComplete: PropTypes.func
  };

  state: CountdownState = { count: this.props.count || 3 };

  interval: number | undefined;

  componentDidMount(): void {
    this.startCountdown();
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  startCountdown = (): void => {
    this.interval = window.setInterval(() => {
      const count = this.state.count - 1;

      if (count === 0) {
        this.stopCountdown();
        this.props.onComplete && this.props.onComplete();
      } else {
        this.setState((prevState) => ({ count: prevState.count - 1 }));
      }
    }, 1000);
  };

  stopCountdown = (): void => {
    clearInterval(this.interval);
  };

  addTime = (seconds: number): void => {
    this.stopCountdown();
    this.setState((prevState) => ({ count: prevState.count + seconds }), this.startCountdown);
  };

  render(): React.ReactNode {
    return this.props.children
      ? React.cloneElement(this.props.children, {
          count: this.state.count
        })
      : null;
  }
}
