import React, { FC, useRef, BaseSyntheticEvent, forwardRef, useState, useEffect } from "react";
import styled from "styled-components";
import {imgFile,musicFile,videoFile} from 'common/hooks/validation'

type Props = {
  type:"image" | "audio" | "video";
  handleError:(error:string) => void;
  imgHandler?: any;
  icon:any;
};

const validateFile = {
  'image': imgFile,
  'audio': musicFile,
  'video': videoFile
}

export const InputFile = forwardRef<HTMLInputElement, Props>(
  ({imgHandler, type,handleError,icon, ...attr }, ref) => {


    const handleChangeImage = async (e:BaseSyntheticEvent) =>{
      const file = e.target.files;

      if(!file || file.length === 0) return
      imgHandler('')
      handleError && handleError('')
      
      const result = await validateFile[type](file[0]);
      if(result){
        handleError && handleError(result);
      }else{
        const fileReader = new FileReader();
        fileReader.onloadend = function(){
          imgHandler(fileReader.result as string);
        }
        fileReader.readAsDataURL(file[0])
      }
    }

    return (
      <>
        <InputFileContainer>
          <FileIcon src={icon}/>
          <InputFileField
            type="file"
            ref={ref}
            // accept={"image/png,image/jpeg"}
            onChange={handleChangeImage}
          />
        </InputFileContainer>
      </>
    );
  }
);

const InputFileContainer = styled.label`
  width: 40px;
  height: 30px;
`;

const FileIcon = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;  
`

const InputFileField = styled.input`
  display: none;
  outline: 0;
  opacity: 0;
  pointer-events: none;
  user-select: none;
`;
