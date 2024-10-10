export interface IBDynamicTextureOption {
    name: string;
    uri: string;
    sx: number;
    sy: number;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
    type: string;
    hasAlpha: boolean;
    isDesignTexture: boolean;
    generateMipMaps: boolean;
    invertY: boolean;
    noMipmapOrOptions: boolean;
    uScale: number;
    vScale: number;
    addressMode: 'CLAMP' | 'MIRROR' | 'WRAP';
    samplingMode: number
}
