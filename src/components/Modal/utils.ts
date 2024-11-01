// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function propsCompare(props, oldProps) {
  let isSame = true;
  Object.keys(props).forEach((key) => {
    // Filter the elements of react.element, these elements will cause a loop call in JSON.stringify
    if (!props[key]?.$$typeof && JSON.stringify({ key: props[key] }) !== JSON.stringify({ key: oldProps[key] })) {
      isSame = false;
    }
  });

  return isSame;
}
