import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../elements/';
// import { storage } from './firebase';
import { actionCreators as imageActions } from '../redux/modules/image';

const Upload = () => {
  const dispatch = useDispatch();
  const isUploading = useSelector(state => state.image.uploading);
  const fileInput = useRef();
  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    }

  }
  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
    
  }

  return (
    <div>
      <input type="file" onChange={selectFile} ref={fileInput} disabled={isUploading} />
      <Button onClickButton={uploadFB}>업로드하기</Button>
    </div>
  )
}

export default Upload
