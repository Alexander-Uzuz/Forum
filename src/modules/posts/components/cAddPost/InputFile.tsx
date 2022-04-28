import React,{FC, useRef,BaseSyntheticEvent} from 'react';
import styled from 'styled-components';

type Props = {
    children:JSX.Element,
    onChange:any
}

export const InputFile:FC<Props> = ({children, onChange}) => {
    const ref:any = useRef(null);
    const onPickFile = (event:BaseSyntheticEvent) => onChange([...event.target.files])


  return (
    <InputFileContainer onClick={() => ref.current.click()}>
        {children}
        <InputFileField type='file' multiple ref={ref} onChange={onPickFile}/>
    </InputFileContainer>
  )
}

const InputFileContainer = styled.div`
    width: 126px;
    height: 30px;
`

const InputFileField = styled.input`
    visibility: hidden;
`;

