// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 18 18' {...props}>
    <circle cx='9' cy='9' fill='#fff' r='9' />
    <path d='m8.516 6.424.135.136c.036.036.073.07.109.101.036.032.072.066.108.102l.162.162c.181.18.253.339.217.474-.036.136-.149.294-.338.474-.082.09-.215.228-.4.413-.185.185-.384.386-.596.603-.212.217-.417.424-.616.623-.198.198-.352.356-.46.474a1.86 1.86 0 0 0-.339.426c-.063.122-.036.242.081.36.082.08.186.189.312.324.126.136.235.248.325.339.153.153.21.288.17.406-.041.117-.175.185-.4.203-.235.027-.497.059-.786.095-.289.036-.587.07-.893.101a45.7 45.7 0 0 0-.9.102 69.82 69.82 0 0 1-.807.095c-.234.027-.397-.002-.487-.088-.09-.086-.127-.237-.108-.454.018-.226.042-.478.074-.758.032-.28.065-.567.102-.86.036-.294.07-.585.101-.874l.088-.799c.027-.261.102-.428.224-.5.121-.073.26-.032.413.121.09.09.207.201.352.332.144.131.266.246.365.345.1.1.194.131.285.095.09-.036.194-.108.311-.216.117-.118.278-.28.48-.488.204-.208.416-.422.637-.643.221-.221.436-.438.643-.65.208-.212.375-.382.502-.508.054-.054.115-.106.182-.156a.59.59 0 0 1 .224-.101.476.476 0 0 1 .25.013.781.781 0 0 1 .278.176ZM14.4 5.26c.234-.027.397.002.487.088.09.086.127.237.108.453a23.71 23.71 0 0 1-.074.759c-.032.28-.065.566-.102.86-.036.293-.07.586-.101.88l-.088.806c-.027.261-.102.426-.224.494-.121.068-.26.025-.413-.129-.09-.09-.214-.207-.372-.352a12.255 12.255 0 0 1-.386-.366c-.1-.099-.185-.142-.257-.128-.072.013-.163.074-.271.183-.126.126-.291.293-.494.5l-.643.657c-.226.23-.447.454-.664.67l-.501.502a3.062 3.062 0 0 1-.176.162.656.656 0 0 1-.21.122.445.445 0 0 1-.244.014.522.522 0 0 1-.264-.176l-.514-.515c-.18-.18-.26-.345-.237-.494.022-.15.124-.314.304-.494l.407-.414c.19-.194.392-.399.609-.616.217-.216.427-.428.63-.636.203-.208.363-.366.48-.474.163-.163.264-.296.305-.4.04-.103.002-.214-.115-.331-.081-.082-.178-.18-.291-.298a22.657 22.657 0 0 0-.305-.312c-.153-.153-.21-.289-.17-.406.041-.117.175-.19.4-.217l.779-.094c.293-.036.594-.07.9-.102.307-.032.607-.065.9-.101.294-.037.563-.068.807-.095Z' fill='#4E5460' />
  </Svg>
);

export default Icon;
