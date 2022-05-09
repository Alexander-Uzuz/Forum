import React, { FC, useRef, BaseSyntheticEvent, forwardRef, useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Camera } from "assets/icons/camera.svg";

type Props = {
  listFile?: any;
  imgHandler?: any;
};

export const InputFile = forwardRef<HTMLInputElement, Props>(
  ({ listFile, imgHandler, ...attr }, ref) => {
    const [image, setImage] = useState('');

    useEffect(() =>{
        if(typeof listFile === 'string'){
            setImage(listFile)
            imgHandler(listFile)
        }else if(listFile instanceof Object && listFile[0]){
            setImage(URL.createObjectURL(listFile[0]))

        }
    },[listFile])


    return (
      <>
        <InputFileContainer>
          <Camera className="camera" />
          <InputFileField
            type="file"
            ref={ref}
            accept={"image/png,image/jpeg"}
            onChange={imgHandler}
          />
        </InputFileContainer>
      </>
    );
  }
);

const InputFileContainer = styled.label`
  width: 126px;
  height: 30px;

  .camera {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;

const InputFileField = styled.input`
  display: none;
  outline: 0;
  opacity: 0;
  pointer-events: none;
  user-select: none;
`;
