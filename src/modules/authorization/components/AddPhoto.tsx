import { forwardRef,BaseSyntheticEvent } from "react";
import styled from "styled-components";
import AddIcon from "assets/icons/addPhoto.svg";
import { ButtonBtn, Button } from "common/components/Button/Button";

type Props = {
  onClick: () => void;
  onChange:(event:BaseSyntheticEvent) => void;
  value: string | null;
};

export const AddPhoto = forwardRef<HTMLInputElement, Props>(
  ({ onClick, value,onChange }, ref) => {


    return (
      <>
        <AddPhotoLabel>
          <AddPhotoIcon src={AddIcon} onClick={onClick} />
          {value ? <ProfilePhoto src={value} /> : ""}
        </AddPhotoLabel>
        <ProfilePhotoButton onClick={onClick}>Изменить фото</ProfilePhotoButton>
        <ProfileInputFile type="file" onChange={onChange} accept="image/*" ref={ref}/>
      </>
    );
  }
);

const AddPhotoLabel = styled.label`
  display:flex;
  justify-content: center;
  align-items: center;
  width:160px;
  height:160px;
  border-radius:50%;
  background:${({theme}) => theme.colors.lightGrey};
  opacity: 0.5;
  border-radius: 10px;
  margin-right: 136px;
  cursor:pointer;
  background: #9c9c9c;

  @media ${({theme}) => theme.media.tablet}{
    margin-right: 0;
  }
`;

const AddPhotoIcon = styled.img`
  width:74px;
  z-index: 1;
  opacity: 0.7;
`;


const ProfilePhoto = styled.img`
  position: absolute;
  z-index: 0;
  width:160px;
  height:160px;
  border-radius: 50%;
  object-fit: contain;
`;


const ProfilePhotoButton = styled(ButtonBtn)`
  width: 160px;
  margin-top: 50px;
`;

const ProfileInputFile = styled.input`
  visibility: hidden;
`;
