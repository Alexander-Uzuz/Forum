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
    },
    media: {
        mobileS: '(max-width:320px)',
        mobileM: '(max-width:375px)',
        mobileL: '(max-width:425px)',
        mobileXL:'(max-width:587px)',
        tablet: '(max-width:768px)',
        laptop: '(max-width:1024px)',
        laptopM:'(max-width:1280px)',
        laptopL: '(max-width:1440px)',
        desktop: '(max-width:2560px)'
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
        },
        media: {
            mobileS: '(max-width:320px)',
            mobileM: '(max-width:375px)',
            mobileL: '(max-width:425px)',
            mobileXL:'(max-width:587px)',
            tablet: '(max-width:768px)',
            laptop: '(max-width:1024px)',
            laptopM:'(max-width:1280px)',
            laptopL: '(max-width:1440px)',
            desktop: '(max-width:2560px)'
        }
        }
    }
