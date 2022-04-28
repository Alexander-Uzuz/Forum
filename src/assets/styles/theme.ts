import {DefaultTheme} from 'styled-components';

export const theme:DefaultTheme = {
    colors:{
        black:'#000000',
        gray:'#808080',
        lightGrey:'#EAEAEA',
        red:'#FF0000',
        orange:'#F48023',
        white:'#FFFFFF',
        blue:'#1682FD',
    }
}

declare module 'styled-components' {
    export interface DefaultTheme {
        colors:{
            black:string,
            gray:string,
            lightGrey:string,
            red:string,
            orange:string,
            white:string,
            blue:string,
        }
        }
    }
