// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
// import { Helmet } from 'react-helmet-async'
// import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'

import Container from './Container';

// export const PageMeta: React.FC<{ symbol?: string }> = ({ symbol }) => {
//   const { t } = useTranslation()
//   const { pathname } = useLocation()

//   const pageMeta = getCustomMeta(pathname, t) || {}
//   const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
//   let pageTitle = title
//   if (symbol) {
//     pageTitle = [symbol, title].join(' - ')
//   }

//   return (
//     <Helmet>
//       <title>{pageTitle}</title>
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:image" content={image} />
//     </Helmet>
//   )
// }

const StyledPage = styled(Container)`
  min-height: calc(100vh - 96px);
  padding-bottom: 100px;
  padding-top: 16px;

  html[data-useragent*='TokenPocket_iOS'] & {
    padding-bottom: 130px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 24px;
    padding-bottom: 16px;
    padding-top: 24px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-bottom: 32px;
    padding-bottom: 16px;
    padding-top: 32px;
  }
`;

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const Page: React.FC<PageProps> = ({ children, title, ...props }) => {
  return (
    <>
      <StyledPage {...props}>{children}</StyledPage>
    </>
  );
};

export default Page;
