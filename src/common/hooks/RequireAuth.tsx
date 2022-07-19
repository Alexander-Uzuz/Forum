import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {useAppSelector} from 'core/redux/hooks';

type Props = {}

export const RequireAuth = (props: Props) => {
    const token = useAppSelector(state => state?.user?.user?.token);

    if(token){
        return <Outlet/>
    }else{
        return <Navigate to='/login'/>
    }
}