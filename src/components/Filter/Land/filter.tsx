// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

import { Button, Checkbox, Row, Col, Input } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { Flex, Box } from 'components/Box';
import { useQuery } from 'hooks/useSearch';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConditionBox } from '../../ConditionBox';
import { FilterBox, FilterTitle, FilterContent } from '../styled';
import { FilterWapper } from '../FilterWapper';

type FilterModule = {
  price?: boolean;
  flag?: boolean;
  resources?: boolean;
};

interface Props {
  module?: FilterModule;
  data?: unknown;
  className?: string;
  onChangeResources?: (checkedValue: CheckboxValueType[]) => void;
  onChangeFlag?: (checkedValue: CheckboxValueType[]) => void;
  onChangePrice?: (checkedValue: CheckboxValueType[]) => void;
  defaultResourcesCheckedList?: string[];
  defaultFlagCheckedList?: string[];
  defaultPriceRange?: string[];
  asyncSearch?: boolean;
}

export const FILTER_PRICE_START = 'filter_price_start';
export const FILTER_PRICE_END = 'filter_price_end';
export const FILTER_RESOURCES = 'filter_resources';
export const FILTER_FLAG = 'filter_flag';

const Filter: React.FC<Props> = ({ className, onChangeResources, onChangeFlag, onChangePrice, defaultResourcesCheckedList, defaultFlagCheckedList, defaultPriceRange, asyncSearch, module }) => {
  const { t } = useTranslation();
  const search = useQuery();
  const { url } = useRouteMatch();
  const history = useHistory();

  const [resourcesCheckedList, setResourcesCheckedList] = useState(defaultResourcesCheckedList || search.get(FILTER_RESOURCES)?.split(','));
  const [flagCheckedList, setFlagCheckedList] = useState(defaultFlagCheckedList || search.get(FILTER_FLAG)?.split(','));
  const [priceRange, setPriceRange] = useState(defaultPriceRange || [search.get(FILTER_PRICE_START), search.get(FILTER_PRICE_END)]);

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

  const handleFlagChange = (values) => {
    if (asyncSearch) {
      if (!values || values.length === 0) {
        search.delete(FILTER_FLAG);
      } else {
        search.set(FILTER_FLAG, values);
      }
      history.push({ pathname: url, search: `?${search}` });
    }

    setFlagCheckedList(values);
    onChangeFlag && onChangeFlag(values);
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

  const handleResetFilter = () => {
    if (asyncSearch) {
      search.delete(FILTER_PRICE_START);
      search.delete(FILTER_PRICE_END);
      search.delete(FILTER_RESOURCES);
      search.delete(FILTER_FLAG);
      history.push({ pathname: url, search: `?${search}` });
    }

    setResourcesCheckedList([]);
    setFlagCheckedList([]);
    setPriceRange([undefined, undefined]);

    onChangeResources && onChangeResources([]);
    onChangeFlag && onChangeFlag([]);
    onChangePrice && onChangePrice([undefined, undefined]);
  };

  // useEffect(() => {
  //   if (defaultResourcesCheckedList && defaultResourcesCheckedList.length > 0) {
  //     search.set(FILTER_RESOURCES, defaultResourcesCheckedList.join(','));
  //   }

  //   if (flagCheckedList && flagCheckedList.length > 0) {
  //     search.set(FILTER_FLAG, flagCheckedList.join(','));
  //   }

  //   history.push({ pathname: url, search: `?${search}` });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <FilterWapper className={className}>
      <Flex justifyContent='space-between' alignItems='center'>
        <FilterTitle>{t('filter_Filter')}</FilterTitle>
        <Button size='small' type='link' onClick={handleResetFilter}>
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
      <Box className='Apostle--filter-'>
        <ConditionBox visible={module?.flag}>
          <FilterBox>
            <FilterTitle>{t('filter_Type')}</FilterTitle>
            <FilterContent>
              <Checkbox.Group style={{ width: '100%' }} value={flagCheckedList} onChange={handleFlagChange}>
                <Row>
                  <Col span={12}>
                    <Checkbox value='normal'>{t('Normal')}</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='reserved'>{t('Reserved')}</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='box'>{t('Mystical')}</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </FilterContent>
          </FilterBox>
        </ConditionBox>

        <ConditionBox visible={module?.resources}>
          <FilterBox>
            <FilterTitle>{t('filter_Resources')}</FilterTitle>
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

        <ConditionBox visible={module?.price}>
          <FilterBox>
            <FilterTitle>{t('filter_Price')}</FilterTitle>
            <FilterContent>
              <Input.Group>
                <Row>
                  <Col span={10}>
                    <Input style={{ textAlign: 'center' }} type='number' placeholder={t('Min')} value={priceRange[0]} onChange={handlePriceStartChange} onBlur={handlePriceStartPressEnter} onPressEnter={handlePriceStartPressEnter} />
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
                      type='number'
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
