import React,{FC,useState,useEffect} from 'react';
import styled from 'styled-components'

type Props = {
    file:any;
}

export const Image:FC<Props> = ({file}) => {
    const [fileUrl, setFileUrl] = useState<any>(null);

    useEffect(() =>{
        if(file){
            setFileUrl(URL.createObjectURL(file))
        }
    },[file])
  return (
    <StyledImg src={fileUrl}/>
  )
}

const StyledImg = styled.img`
    max-width:500px;
    max-height:470px;
    margin-top:10px;
    border-radius: 20px;
`;