// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Button, Flex, useModal, UploadIcon, Link } from 'components';
import { StyledFontAttr } from 'ui/styled';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import useToast from 'hooks/useToast';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { bundleApi } from 'api';
import { useUpdateLandInfo } from 'hooks/useLand';
import { isValidUrl } from 'utils/url';
import { shortenString } from 'utils';
import { UploadCoverModal } from '../UploadCoverModal';

const { TextArea } = Input;

export interface Props extends BareProps {
  number?: string;
  landId: SUPPORTED_LANDS_INDEX;
  landIndex: number;
  landCoverMetaData: LandCoverMetaData;
  saveCallback?: () => void;
  size?: string;
  supportEdit?: boolean;
}

export interface LandCoverMetaData {
  bio?: string;
  link?: string;
  cover?: string;
}

const StyledLandMatedata = styled.div`

`;

const StyledCover = styled.div<{ isEdit: boolean; size?: string }>`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 20px;
  cursor: ${({ isEdit }) => (isEdit ? 'pointer' : 'auto')};
  display: flex;
  height: ${({ size }) => size || '200px'};
  justify-content: center;
  overflow: hidden;
  width: ${({ size }) => size || '200px'};

  image {
    height: 100%;
    width: 100%;
  }
`;

const StyledEmptyText = styled.p<{ isActive: boolean }>`
  color: ${({ theme, isActive }) => (isActive ? theme.colors.text : theme.colors.textDisabled)};
`;

const LandMatedata: React.FC<Props> = ({ className, landId, landIndex, size, supportEdit, landCoverMetaData, saveCallback }) => {
  const { t } = useTranslation();
  const { library, account } = useActiveWeb3React(landId);
  const { toastSuccess, toastError } = useToast();
  const { updateLandInfo, isLoading: updateLandInfoIsLoading } = useUpdateLandInfo();
  const [bio, setBio] = useState(landCoverMetaData.bio);
  const [link, setLink] = useState(landCoverMetaData.link);
  const [cover, setCover] = useState(landCoverMetaData.cover);

  const [isEdit, setIsEdit] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  const bioHandler = useCallback((e) => {
    setBio(e.target.value || '');
  }, []);

  const linkHandler = useCallback((e) => {
    setLink(e.target.value || '');
  }, []);

  const uploadFileCallback = useCallback(([_cover, _file]) => {
    setUploadFile(_file);
    setCover(_cover);
  }, []);

  const previewImageSrc = useMemo(() => {
    if (uploadFile) {
      return URL.createObjectURL(uploadFile);
    }

    return cover;
  }, [cover, uploadFile]);

  const [onPresentPreviewModal] = useModal(<UploadCoverModal title={t('Preview')} callback={uploadFileCallback} initCover={cover} initUploadFile={uploadFile} />);

  const openPreviewModal = useCallback(() => {
    isEdit && onPresentPreviewModal();
  }, [isEdit, onPresentPreviewModal]);

  const saveLandInfo = useCallback(async () => {
    if (link && !isValidUrl(link)) {
      toastError('Enter a valid URL !');
      return;
    }

    if (bio.length > 250) {
      toastError('Bio requires less than 250 characters !');
      return;
    }

    const [message, signature] = await bundleApi[landId].signMessageWithMeta(
      library.getSigner(),
      JSON.stringify({
        bio,
        link,
        land_id: landIndex
      })
    );

    const landInfo = new FormData();
    if (uploadFile) {
      landInfo.append('image', uploadFile);
      landInfo.append('delete_image', 'false');
    }

    if (!uploadFile && !cover) {
      landInfo.append('delete_image', 'true');
    }

    landInfo.append('message', message);
    landInfo.append('sig', signature);
    landInfo.append('address', bundleApi[landId].toDisplayAddress(account));

    const result = await updateLandInfo(landInfo);
    if (result.code === 0) {
      toastSuccess(t('Save land information success !'));
      saveCallback && saveCallback();
      setIsEdit(false);
    } else {
      toastError(result.detail);
    }
  }, [account, bio, cover, landId, landIndex, library, link, saveCallback, t, toastError, toastSuccess, updateLandInfo, uploadFile]);

  const cancelHandler = useCallback(() => {
    setBio(landCoverMetaData.bio);
    setLink(landCoverMetaData.link);
    setCover(landCoverMetaData.cover);
    setIsEdit(false);
  }, [landCoverMetaData.bio, landCoverMetaData.cover, landCoverMetaData.link]);

  return (
    <StyledLandMatedata className={className}>
      <Flex>
        <StyledCover size={size} isEdit={isEdit} onClick={openPreviewModal}>
          {previewImageSrc ? <img src={previewImageSrc} alt='land cover' /> : <UploadIcon width='50%' />}
        </StyledCover>
        <Flex flexDirection='column' ml='1rem ' className='space-y-2' flex={1}>
          <Flex flexDirection='column' flex={1} className='space-y-2'>
            <StyledFontAttr>{t('Bio')}</StyledFontAttr>
            {isEdit ? <TextArea disabled={!isEdit} value={bio} rows={4} onChange={bioHandler} maxLength={250} /> : <StyledEmptyText isActive={!!bio}>{bio || t('Empty')}</StyledEmptyText>}
          </Flex>

          <Flex flexDirection='column' className='space-y-2'>
            <StyledFontAttr>{t('Link')}</StyledFontAttr>
            {isEdit ? (
              <Input value={link} disabled={!isEdit} onChange={linkHandler} />
            ) : link ? (
              <Link external href={link}>
                {shortenString(link, 50)}
              </Link>
            ) : (
              <StyledEmptyText isActive={!!link}>{link || t('Empty')}</StyledEmptyText>
            )}
          </Flex>
        </Flex>
      </Flex>
      {supportEdit ? (
        isEdit ? (
          <Flex mt='1rem' className='space-x-4'>
            <Button isLoading={updateLandInfoIsLoading} width='100%' scale='sm' onClick={saveLandInfo}>
              {t('Save')}
            </Button>
            <Button width='100%' variant='secondary' scale='sm' onClick={cancelHandler}>
              {t('Cancel')}
            </Button>
          </Flex>
        ) : (
          <Button mt='1rem' width='100%' scale='sm' onClick={() => setIsEdit(true)}>
            {t('Edit')}
          </Button>
        )
      ) : null}
    </StyledLandMatedata>
  );
};

export default LandMatedata;
