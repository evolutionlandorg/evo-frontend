// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Modal, Button, ModalProps, Flex, UploadIcon } from 'components';
import styled from 'styled-components';
import useToast from 'hooks/useToast';
import { useTranslation } from 'react-i18next';

interface Props extends ModalProps {
  initCover?: string;
  initUploadFile: any;
  callback: (file: any) => void;
}

const StyledCover = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 20px;
  height: 200px;
  overflow: hidden;
  width: 200px;

  label {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  input {
    display: none;
  }
`;

const UploadCoverModal: React.FC<Props> = ({ title, onDismiss, callback, initCover, initUploadFile, ...props }) => {
  const { t } = useTranslation();
  const inputFileRef = useRef<HTMLInputElement>();
  const { toastError } = useToast();
  const [uploadFile, setUploadFile] = useState(initUploadFile);
  const [cover, setCover] = useState(initCover);

  const previewImageSrc = useMemo(() => {
    if (uploadFile) {
      return URL.createObjectURL(uploadFile);
    }

    return cover;
  }, [cover, uploadFile]);

  const uploadCoverHandler = useCallback(
    async (e) => {
      const { target } = e;
      const files = Array.from(target.files);
      const file = files && Array.isArray(files) && files.length ? files[0] : null;

      if (file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          toastError('You can only upload JPG/PNG file !');
        }
        const isLt2M = file.size / 1024 / 1024 < 0.5;
        if (!isLt2M) {
          toastError('Image must smaller than 500kb !');
        }

        if (!(isJpgOrPng && isLt2M)) return;

        setUploadFile(file);
      }
    },
    [toastError]
  );

  const confirmHandler = useCallback(() => {
    callback && callback([cover, uploadFile]);
    onDismiss();
  }, [callback, cover, onDismiss, uploadFile]);

  const deleteFileHandler = useCallback(() => {
    inputFileRef.current.value = '';
    setUploadFile(null);
    setCover('');
    callback && callback(['', null]);
    onDismiss();
  }, [callback, onDismiss]);

  return (
    <Modal title={title} onDismiss={onDismiss} minWidth='auto' {...props}>
      <Flex flexDirection='column' alignItems='center'>
        <StyledCover>
          <label htmlFor='uploadcover'>{previewImageSrc ? <img src={previewImageSrc} alt='preview' /> : <UploadIcon width='50%' />}</label>
          <input id='uploadcover' ref={inputFileRef} type='file' accept='image/*' onChange={uploadCoverHandler} />
        </StyledCover>
        <Flex justifyContent='space-between' alignSelf='stretch' mt='1rem'>
          <Button scale='sm' onClick={confirmHandler}>
            {t('Confirm')}
          </Button>
          <Button scale='sm' variant='secondary' onClick={deleteFileHandler}>
            {t('Delete')}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default React.memo<Props>(UploadCoverModal);
