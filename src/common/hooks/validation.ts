
export const imgFile = (file:File):Promise<string> =>{
    return new Promise((res:(value:string) => void) => {
        const type = file.type.split('/')[1];

        if(type !== 'png' && type !== 'jpeg'){
            res('The photo only contains the format png/jpeg')
        }else if((file.size / 1024) / 1024 > 1){
            res('The size should not exceed 1MB')
        }else{
            res('')
        }
    })
}

export const musicFile = (file:File):Promise<string> =>{
    return new Promise((res:(value:string) => void) => {
        const type = file.type.split('/')[1];
        if(type !== 'mpeg'){
            res('The music only contains the format mp3')
        }else if((file.size / 1024) / 1024 > 5){
            res('The size should not exceed 5MB')
        }else{
            res('')
        }
    })
}

export const videoFile = (file:File):Promise<string> =>{
    return new Promise((res: (value:string) => void) => {
        const type = file.type.split('/')[1];
        if(type !== 'mp4'){
            res('The video only contains the format mp4')
        }else if((file.size / 1024) / 1024 > 5){
            res('The size should not exceed 5MB')
        }else{
            res('')
        }
    })
}