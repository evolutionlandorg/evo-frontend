// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, GovFunctionIcon, GovProposalIcon, GovVotingIcon, GovStakeIcon, Text, LinkExternal } from 'components';
import Page from 'components/Layout/Page';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { StyledContentBox, StyledFontTitle } from 'ui/styled';

const Wrapper = styled(StyledContentBox)`
  padding: 3.125rem;
  padding-bottom: 1.875rem;
`;

const layoutStyle = css`
  align-items: center;
  justify-content: center;
`;
const cardStyle = css`
  background-color: ${({ theme }) => theme.colors.collapseHeaderBackground}b2;
  border-radius: ${({ theme }) => theme.radii.default};
`;

const ContentWrapper = styled(Flex)`
  ${layoutStyle}

  flex-direction: column;
`;
const CouncilWrapper = styled.a`
  ${layoutStyle}
  ${cardStyle}
  ${tw`py-3.5 px-6 space-y-3`}

  display: flex;
  flex-direction: column;
  border: 1px solid transparent;

  &:not(:nth-of-type(2)):hover {
    background: ${({ theme }) => theme.colors.backgroundContent};
    border-color: ${({ theme }) => theme.colors.cardBorder};
  }

  &:nth-of-type(2) {
    cursor: not-allowed;
  }
`;
const Councils = styled.div`
  ${tw`w-full`}

  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
`;
const CouncilImg = styled.img`
  min-height: 1rem;
  width: 70%;
`;
const CouncilText = styled(Text)`
  ${tw`text-sm font-bold`}

  white-space: nowrap;
`;

const InterstellarWrapper = styled(CouncilWrapper)`
  width: 10rem;
`;
const InterstellarText = styled(StyledFontTitle)`
  ${tw`text-sm font-bold`}

  white-space: nowrap;
`;

const Divider = styled.div`
  ${tw`mt-3.5 w-2.5 h-2.5`}

  margin-bottom: 2.75rem;
  position: relative;
  border-radius: ${({ theme }) => theme.radii.circle};

  &,
  ::after {
    background-color: #ededed;
  }

  ::after {
    content: '';
    height: 1.875rem;
    left: 50%;
    position: absolute;
    top: 100%;
    transform: translateX(-50%);
    width: 2px;
  }
`;

const Operations = styled.div`
  ${tw`mt-20`}

  margin-bottom: 1.875rem;
  width: 100%;
  display: grid;
  gap: 3.125rem;
  grid-template-columns: repeat(2, 7rem);

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, 7rem);
  }
`;

const Operation = styled.button`
  ${layoutStyle}
  ${cardStyle}
  ${tw`py-3.5 px-6 space-y-3`}

  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;
  width: 100%;

  svg {
    width: 40%;
  }

  &.activated,
  :hover {
    background: ${({ theme }) => theme.colors.itemBackground};

    p {
      color: #fff;
    }
  }
`;
const OperationText = InterstellarText;

const OperationDescription = styled.pre`
  white-space: pre-wrap;
  word-break: break-all;
`;
const LineLinkExternal = styled(LinkExternal)`
  display: inline-flex;
`;

const councils = [
  {
    img: '/images/gov/council/atlantis.png',
    text: 'Atlantis Council',
    href: 'https://snapshot.org/#/evolutionlandatlantis.eth'
  },
  {
    img: '/images/gov/council/byzantine.png',
    text: 'Byzantine Council',
    // eslint-disable-next-line no-script-url
    href: 'javascript:void(0);'
  },
  {
    img: '/images/gov/council/columbus.png',
    text: 'Columbus Council',
    href: 'https://snapshot.org/#/evolutionlandcolumbus.eth'
  },
  {
    img: '/images/gov/council/dawning.png',
    text: 'Dawning Council',
    href: 'https://snapshot.org/#/evolutionlanddawning.eth'
  },
  {
    img: '/images/gov/council/eden.png',
    text: 'Eden Council',
    href: 'https://snapshot.org/#/evolutionlandeden.eth'
  }
] as const;

const operations = [
  {
    id: 1,
    SvgComponent: GovFunctionIcon,
    text: 'Function',
    description: 'Function_Description',
    components: []
  },
  {
    id: 2,
    SvgComponent: GovProposalIcon,
    text: 'Proposal',
    description: 'Proposal_Description',
    components: {
      reddit: <LineLinkExternal href='https://www.reddit.com/r/EvolutionLand' />,
      grant: <LineLinkExternal href='https://www.reddit.com/r/EvolutionLand/comments/unpa5j/evolution_land_grant/' />
    }
  },
  {
    id: 3,
    SvgComponent: GovVotingIcon,
    text: 'Voting Power',
    description: 'Voting_Power_Description',
    components: []
  },
  {
    id: 4,
    SvgComponent: GovStakeIcon,
    text: 'KTON Stake',
    description: 'KTON_Stake_Description',
    components: {
      staking: <LineLinkExternal href='https://gov.evolution.land/#/land/1/staking' />,
      dao: <LineLinkExternal href='https://gov.evolution.land/#/land/5/dao' />
    }
  }
] as const;

export function GovDetails() {
  const { t } = useTranslation('gov');
  const [curOperationIndex, setCurOperationIndex] = useState(0);

  return (
    <Page>
      <Wrapper>
        <ContentWrapper>
          <InterstellarWrapper href='https://snapshot.org/#/evolutionland.eth' target='_blank'>
            <CouncilImg alt='' src='/images/gov/council/interstellar.png' />
            <InterstellarText>{t('Interstellar Council')}</InterstellarText>
          </InterstellarWrapper>
          <Divider />
          <Councils>
            {councils.map(({ img, text, href }, i) => (
              <CouncilWrapper key={i} href={href} target='_blank'>
                <CouncilImg alt={text} src={img} />
                <CouncilText>{t(text)}</CouncilText>
              </CouncilWrapper>
            ))}
          </Councils>
          <Flex justifyContent='center'>
            <Operations>
              {operations.map(({ SvgComponent, text }, i) => (
                <Operation key={i} className={`${i === curOperationIndex && 'activated'}`} onClick={() => setCurOperationIndex(i)}>
                  <SvgComponent />
                  <OperationText>{t(text)}</OperationText>
                </Operation>
              ))}
            </Operations>
          </Flex>
        </ContentWrapper>
        <StyledContentBox>
          <OperationDescription>
            <Trans t={t} i18nKey={operations[curOperationIndex].description} components={operations[curOperationIndex].components} />
          </OperationDescription>
        </StyledContentBox>
      </Wrapper>
    </Page>
  );
}
