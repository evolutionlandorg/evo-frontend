// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from 'components/Layout/Page';
import { Flex, Tabs, Content } from 'components';
import { Select } from 'antd';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SelectValue } from 'antd/lib/select';
import { useTranslation } from 'react-i18next';
import DrillUpgrade from './drill/Upgrade';
import DrillDismantle from './drill/Dismantle';

const Wrapper = styled(Content)`
  ${tw`py-2.5 px-4 mt-4`}
`;

const FurnaceTypeSelect = styled(Select)`
  ${tw`w-40`}
`;

interface Props {
  className?: string;
  basePath: string;
}

const selectOption = {
  drill: [
    { label: 'Upgrade', value: 'upgrade', key: 'upgrade' },
    { label: 'Dismantle', value: 'dismantle', key: 'dismantle' }
  ],
  equipment: [
    { label: 'Forge', value: 'forge', key: 'forge' },
    { label: 'Upgrade', value: 'upgrade', key: 'upgrade' },
    { label: 'Dismantle', value: 'dismantle', key: 'dismantle' }
  ]
} as const;

const Index: React.FC<Props> = ({ className, basePath }) => {
  const history = useHistory();
  const { url } = useRouteMatch(basePath);
  const { t } = useTranslation();

  const matchWithParams = useRouteMatch<{ page: string; type: string }>(`${basePath}/:page/:type`);
  const { params } = matchWithParams || {};

  const tabs = useMemo(() => [{ label: t('Evolution Land'), value: 'drill', name: 'Evolution Land' }], [t]);

  const [page, setPage] = useState<string>(() => params?.page);
  const [type, setType] = useState(() => params?.type);

  const pageChange = useCallback(
    (value: SelectValue, forcePage?: string) => {
      history.replace(`${url}/${forcePage ?? page}/${value}`);
      forcePage && setPage(forcePage);
      setType(value.toString());
    },
    [history, page, url]
  );

  useEffect(() => {
    if (params) {
      return;
    }

    pageChange(selectOption[tabs[0].value][0].value, tabs[0].value);
  }, [pageChange, tabs, params]);

  return (
    <Page className={className}>
      <Flex flex='1' height='100%'>
        <Flex flex='1' height='100%' flexDirection='column' padding='3'>
          {params && (
            <Tabs
              basePath={url}
              url={url}
              items={tabs}
              onChange={(e) => {
                const curPage = e.target.value;
                const curType = selectOption[curPage][0].value;
                pageChange(curType, curPage);
              }}
            />
          )}
          <Wrapper>
            <FurnaceTypeSelect value={type} onChange={(value) => pageChange(value)}>
              {selectOption[page]?.map(({ key, value, label }) => (
                <Select.Option key={key} value={value}>
                  {t(label)}
                </Select.Option>
              ))}
            </FurnaceTypeSelect>
            <Switch>
              <Route path={`${basePath}/drill/upgrade`}>
                <DrillUpgrade />
              </Route>
              <Route path={`${basePath}/drill/dismantle`}>
                <DrillDismantle />
              </Route>
            </Switch>
          </Wrapper>
        </Flex>
      </Flex>
    </Page>
  );
};

export default Index;
