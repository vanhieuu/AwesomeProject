export const images ={
    logoMobile:require('./source/logo.png'),
    backgroundImage:require('./source/bg.png'),
    banner:require('./source/banner.png'),
    imageSuccess:require('./source/imageSuccess.png'),
    wifiPic:require('./source/illus.png')
} 

export type ImageTypes = keyof typeof images;
