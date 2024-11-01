// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

import { Button, Checkbox, Row, Col, Slider, Input } from 'antd';
import { Box, ConditionBox } from 'components';
import { Flex } from 'components/Box';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'hooks/useSearch';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FilterBox, FilterTitle, FilterContent } from '../styled';
import { FilterWapper } from '../FilterWapper';

type FilterModule = {
  price?: boolean;
  gens?: boolean;
  resources?: boolean;
  professions?: boolean;
};

interface Props {
  module?: FilterModule;
  className?: string;
  defaultResourcesCheckedList?: string[];
  defaultProfessionCheckedList?: string[];
  onChangeResources?: (checkedValue: CheckboxValueType[]) => void;
  onChangeProfessions?: (checkedValue: string[]) => void;
  defaultPriceRange?: string[];
  onChangePrice?: (checkedValue: CheckboxValueType[]) => void;
  defaultGensRange?: [number, number];
  onChangeGens?: (value: number[]) => void;
  asyncSearch?: boolean;
}

const ProfessionCheckbox = styled(Checkbox)`
  min-width: 50%;

  & + & {
    margin-left: 0;
  }
`;

export const FILTER_PRICE_START = 'filter_price_start';
export const FILTER_PRICE_END = 'filter_price_end';
export const FILTER_GENS_START = 'filter_gens_start';
export const FILTER_GENS_END = 'filter_gens_end';
export const FILTER_RESOURCES = 'filter_resources';
export const FILTER_PROFESSION = 'filter_profession';

const Filter: React.FC<Props> = ({ module, className, defaultResourcesCheckedList, defaultProfessionCheckedList, onChangeResources, onChangeProfessions, defaultPriceRange, onChangePrice, defaultGensRange, onChangeGens, asyncSearch }) => {
  const { t } = useTranslation();
  const search = useQuery();
  const { url } = useRouteMatch();
  const history = useHistory();

  const [resourcesCheckedList, setResourcesCheckedList] = useState(defaultResourcesCheckedList || search.get(FILTER_RESOURCES)?.split(','));
  const [priceRange, setPriceRange] = useState(defaultPriceRange || [search.get(FILTER_PRICE_START), search.get(FILTER_PRICE_END)]);
  const [gensRange, setGensRange] = useState<[number, number]>(defaultGensRange || (!(search.get(FILTER_GENS_START) || search.get(FILTER_GENS_START)) ? [0, 40] : [parseInt(search.get(FILTER_GENS_START)), parseInt(search.get(FILTER_GENS_END))]));
  const [professionCheckedList, setProfessionCheckedList] = useState(defaultProfessionCheckedList || search.get(FILTER_PROFESSION)?.split(','));

  const handleResourcesChange = (values) => {
    if (asyncSearch) {
      if (!values || values.length === 0) {
        search.delete(FILTER_RESOURCES);
      } else {
        search.set(FILTER_RESOURCES, values);
      }
      history.push({ pathname: url, search: `?${search}` });
    }

    setResourcesCheckedList(values);
    onChangeResources && onChangeResources(values);
  };

  const handleProfessionChange = (values: string[]) => {
    if (asyncSearch) {
      if (!values || values.length === 0) {
        search.delete(FILTER_PROFESSION);
      } else {
        search.set(FILTER_PROFESSION, values.join(','));
      }
      history.push({ pathname: url, search: `?${search}` });
    }

    setProfessionCheckedList(values);
    onChangeProfessions && onChangeProfessions(values);
  };

  const handlePriceStartChange = ({ target: { value } }) => {
    setPriceRange([value, priceRange[1]]);
  };

  const handlePriceEndChange = ({ target: { value } }) => {
    setPriceRange([priceRange[0], value]);
  };

  const handlePriceStartPressEnter = (e) => {
    if (asyncSearch) {
      if (e.target.value === null || e.target.value === '') {
        search.delete(FILTER_PRICE_START);
      } else {
        search.set(FILTER_PRICE_START, e.target.value);
      }
      history.push({ pathname: url, search: `?${search}` });
    }
    onChangePrice && onChangePrice(priceRange);
  };

  const handlePriceEndPressEnter = (e) => {
    if (asyncSearch) {
      if (e.target.value === null || e.target.value === '') {
        search.delete(FILTER_PRICE_END);
      } else {
        search.set(FILTER_PRICE_END, e.target.value);
      }
      history.push({ pathname: url, search: `?${search}` });
    }
    onChangePrice && onChangePrice(priceRange);
  };

  const handleGensChange = (value: [number, number]) => {
    if (asyncSearch) {
      search.set(FILTER_GENS_START, value[0]?.toString());
      search.set(FILTER_GENS_END, value[1]?.toString());
      history.push({ pathname: url, search: `?${search}` });
    }

    setGensRange(value);
    onChangeGens && onChangeGens(value);
  };

  return (
    <FilterWapper className={className}>
      <Flex justifyContent='space-between' alignItems='center'>
        <FilterTitle>{t('filter_Filter')}</FilterTitle>
        <Button type='link' size='small'>
          {t('filter_Clear Filter')}
        </Button>
      </Flex>
      {/* <Box mt='3'>
        <Radio.Group defaultValue='general' buttonStyle='solid' className='Apostle--filter-radio'>
          <Radio.Button value='general'>General</Radio.Button>
          <Radio.Button value='mining'>Mining</Radio.Button>
          <Radio.Button value='stats'>Stats</Radio.Button>
        </Radio.Group>
      </Box> */}
      <Box>
        <ConditionBox visible={module?.resources}>
          <FilterBox>
            <FilterTitle>{t('filter_Resource Prefer')}</FilterTitle>
            <FilterContent>
              <Checkbox.Group style={{ width: '100%' }} value={resourcesCheckedList} onChange={handleResourcesChange}>
                <Row>
                  <Col span={12}>
                    <Checkbox value='gold'>GOLD</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='wood'>WOOD</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='water'>WATER</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='fire'>FIRE</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='soil'>SOIL</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </FilterContent>
          </FilterBox>
        </ConditionBox>

        <ConditionBox visible={module?.professions}>
          <FilterBox>
            <FilterTitle>{t('filter_Profession')}</FilterTitle>
            <FilterContent>
              <Checkbox.Group style={{ width: '100%' }} value={professionCheckedList} onChange={(values) => handleProfessionChange(values as string[])}>
                <Flex flexWrap='wrap'>
                  <ProfessionCheckbox value='saber'>{t('Swordsman')}</ProfessionCheckbox>
                  <ProfessionCheckbox value='guard'>{t('Guard')}</ProfessionCheckbox>
                  <ProfessionCheckbox value='normal'>{t('Normal')}</ProfessionCheckbox>
                </Flex>
              </Checkbox.Group>
            </FilterContent>
          </FilterBox>
        </ConditionBox>

        <ConditionBox visible={module?.gens}>
          <FilterBox>
            <FilterTitle>{t('filter_Generation')}</FilterTitle>
            <FilterContent>
              <Slider range={{ draggableTrack: true }} min={0} max={50} defaultValue={gensRange} onAfterChange={handleGensChange} />
            </FilterContent>
          </FilterBox>
        </ConditionBox>

        <ConditionBox visible={module?.price}>
          <FilterBox>
            <FilterTitle>{t('filter_Price')}</FilterTitle>
            <FilterContent>
              <Input.Group>
                <Row>
                  <Col span={10}>
                    <Input style={{ textAlign: 'center' }} placeholder={t('Min')} value={priceRange[0]} onChange={handlePriceStartChange} onBlur={handlePriceStartPressEnter} onPressEnter={handlePriceStartPressEnter} />
                  </Col>
                  <Col span={4}>
                    <Input
                      className='site-input-split'
                      style={{
                        borderLeft: 0,
                        borderRight: 0,
                        pointerEvents: 'none'
                      }}
                      placeholder='~'
                      disabled
                    />
                  </Col>
                  <Col span={10}>
                    <Input
                      className='site-input-right'
                      style={{
                        textAlign: 'center'
                      }}
                      placeholder={t('Max')}
                      value={priceRange[1]}
                      onChange={handlePriceEndChange}
                      onBlur={handlePriceEndPressEnter}
                      onPressEnter={handlePriceEndPressEnter}
                    />
                  </Col>
                </Row>
              </Input.Group>
            </FilterContent>
          </FilterBox>
        </ConditionBox>
      </Box>
    </FilterWapper>
  );
};

export default React.memo<Props>(Filter);
