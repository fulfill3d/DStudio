export const product_manifest = {
    materials: [
        {
            id: 1,
            name: 'standard_material',
            diffuseColor: [0.95, 0.95, 0.95],
            specularColor: [1, 1, 1],
            specularPower: 50,
            zOffset: 0,
            type: 'standard',
            hasTexture: true,
            hasColor: false,
        },
        {
            id: 2,
            name: 'design_material',
            diffuseColor: [0.95, 0.95, 0.95],
            specularColor: [1, 1, 1],
            specularPower: 50,
            zOffset: -1,
            type: 'standard',
            hasTexture: true,
            hasColor: false,
        }
    ],
    textures: [
        {
            id: 1,
            name: 'wrap_texture',
            type: 'dynamic',
            size: 256,
            hasAlpha: true,
            isDesignTexture: false,
            generateMipMaps: true,
            addressMode: 'WRAP',
            samplingMode: 'TRILINEAR',
            uScale: 1,
            vScale: 1
        },
        {
            id: 2,
            name: 'clamp_texture',
            type: 'dynamic',
            size: 256,
            hasAlpha: true,
            isDesignTexture: false,
            generateMipMaps: true,
            addressMode: 'CLAMP',
            samplingMode: '',
            uScale: -1,
            vScale: 1,
            invertY: true,
            noMipmapOrOptions: true,
        }
    ],
    assets: {
        images: [
            {
                id: 0,
                name: 'blank',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/blank.png'
            },
            {
                id: 1,
                name: 'alpine',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/alpine.png'
            },
            {
                id: 2,
                name: 'black-tonal',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/black-tonal.png'
            },
            {
                id: 3,
                name: 'charcoal',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/charcoal.png'
            },
            {
                id: 4,
                name: 'cream-tonal',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/cream-tonal.png'
            },
            {
                id: 5,
                name: 'fog',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/fog.png'
            },
            {
                id: 6,
                name: 'iris',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/iris.png'
            },
            {
                id: 7,
                name: 'rose-quartz',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/rose-quartz.png'
            },
            {
                id: 8,
                name: 'tigerlily',
                uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/tigerlily.png'
            }
        ],
        meshes: [
            {
                id: 1,
                name : 'mug_color_zone_1',
                root_uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/',
                uri: 'mug_color_zone_1.glb',
            },
            {
                id: 2,
                name : 'mug_color_zone_2',
                root_uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/',
                uri: 'mug_color_zone_2.glb',
            },
            {
                id: 3,
                name : 'mug_print_area',
                root_uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/',
                uri: 'mug_print_area.glb',
            },
            {
                id: 4,
                name : 'mug_print_zone',
                root_uri: 'https://fulfill3dblobalpha.blob.core.windows.net/dstudio/',
                uri: 'mug_print_zone.glb',
            }
        ],
    },
    variants: [
        {
            id: 1,
            mapping: {
                color_1: 1,
                color_2: 4,
                color_blank: 0,
            }
        },
        {
            id: 2,
            mapping: {
                color_1: 6,
                color_2: 4,
                color_blank: 0,
            }
        },
        {
            id: 3,
            mapping: {
                color_1: 8,
                color_2: 4,
                color_blank: 0,
            }
        },
        {
            id: 4,
            mapping: {
                color_1: 2,
                color_2: 4,
                color_blank: 0,
            }
        },
        {
            id: 5,
            mapping: {
                color_1: 3,
                color_2: 4,
                color_blank: 0,
            }
        },
    ],
    mappings:{
        variant: {
            mug_print_area: 'color_blank',
            mug_color_zone_1: 'color_1',
            mug_color_zone_2: 'color_1',
            mug_print_zone: 'color_2',
        }
    },
    components : [
        {
            id: 1,
            name : 'mug_color_zone_1',
            is_design_component : false,
            mesh: 1,
            material: 1,
            texture: 1
        },
        {
            id: 2,
            name : 'mug_color_zone_2',
            is_design_component : false,
            mesh: 2,
            material: 1,
            texture: 1
        },
        {
            id: 3,
            name : 'mug_print_area',
            is_design_component : true,
            mesh: 3,
            material: 2,
            texture: 2
        },
        {
            id: 4,
            name : 'mug_print_zone',
            is_design_component : false,
            mesh: 4,
            material: 1,
            texture: 1
        }
    ],
}
