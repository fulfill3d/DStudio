export class Assets {
    images: Image[];
    meshes: Mesh[];

    constructor(images: Image[], meshes: Mesh[]) {
        this.images = images;
        this.meshes = meshes;
    }

    static fromJSON(data: any): Assets {
        return new Assets(
            data.images.map((image: any) => Image.fromJSON(image)),
            data.meshes.map((mesh: any) => Mesh.fromJSON(mesh))
        );
    }
}

export class Component {
    id: number;
    name: string;
    is_design_component: boolean;
    mesh: number;
    material: number;
    texture: number;

    constructor(id: number, name: string, is_design_component: boolean, mesh: number, material: number, texture: number) {
        this.id = id;
        this.name = name;
        this.is_design_component = is_design_component;
        this.mesh = mesh;
        this.material = material;
        this.texture = texture;
    }

    static fromJSON(data: any): Component {
        return new Component(
            data.id,
            data.name,
            data.is_design_component,
            data.mesh,
            data.material,
            data.texture
        );
    }
}

export class Image {
    id: number;
    name: string;
    uri: string;

    constructor(id: number, name: string, uri: string) {
        this.id = id;
        this.name = name;
        this.uri = uri;
    }

    static fromJSON(data: any): Image {
        return new Image(data.id, data.name, data.uri);
    }
}

export class Mappings {
    variant: Record<string, string>;

    constructor(variant: Record<string, string>) {
        this.variant = variant;
    }

    static fromJSON(data: any): Mappings {
        return new Mappings(data.variant);
    }
}

export class Material {
    id: number;
    name: string;
    diffuseColor: number[];
    specularColor: number[];
    specularPower: number;
    zOffset: number;
    type: string;
    hasTexture: boolean;
    hasColor: boolean;

    constructor(
        id: number,
        name: string,
        diffuseColor: number[],
        specularColor: number[],
        specularPower: number,
        zOffset: number,
        type: string,
        hasTexture: boolean,
        hasColor: boolean
    ) {
        this.id = id;
        this.name = name;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.specularPower = specularPower;
        this.zOffset = zOffset;
        this.type = type;
        this.hasTexture = hasTexture;
        this.hasColor = hasColor;
    }

    static fromJSON(data: any): Material {
        return new Material(
            data.id,
            data.name,
            data.diffuseColor,
            data.specularColor,
            data.specularPower,
            data.zOffset,
            data.type,
            data.hasTexture,
            data.hasColor
        );
    }
}

export class Mesh {
    id: number;
    name: string;
    root_uri: string;
    uri: string;

    constructor(id: number, name: string, root_uri: string, uri: string) {
        this.id = id;
        this.name = name;
        this.root_uri = root_uri;
        this.uri = uri;
    }

    static fromJSON(data: any): Mesh {
        return new Mesh(data.id, data.name, data.root_uri, data.uri);
    }
}

export class ProductManifest {
    materials: Material[];
    textures: Texture[];
    assets: Assets;
    variants: Variant[];
    mappings: Mappings;
    components: Component[];

    constructor(
        materials: Material[],
        textures: Texture[],
        assets: Assets,
        variants: Variant[],
        mappings: Mappings,
        components: Component[]
    ) {
        this.materials = materials;
        this.textures = textures;
        this.assets = assets;
        this.variants = variants;
        this.mappings = mappings;
        this.components = components;
    }

    static fromJSON(data: any): ProductManifest {
        return new ProductManifest(
            data.materials.map((material: any) => Material.fromJSON(material)),
            data.textures.map((texture: any) => Texture.fromJSON(texture)),
            Assets.fromJSON(data.assets),
            data.variants.map((variant: any) => Variant.fromJSON(variant)),
            Mappings.fromJSON(data.mappings),
            data.components.map((component: any) => Component.fromJSON(component))
        );
    }
}

export class Texture {
    id: number;
    name: string;
    type: string;
    size: number;
    hasAlpha: boolean;
    isDesignTexture: boolean;
    generateMipMaps: boolean;
    addressMode: string;
    samplingMode: string;
    uScale: number;
    vScale: number;
    invertY: boolean | null;
    noMipmapOrOptions: boolean | null;

    constructor(
        id: number,
        name: string,
        type: string,
        size: number,
        hasAlpha: boolean,
        isDesignTexture: boolean,
        generateMipMaps: boolean,
        addressMode: string,
        samplingMode: string,
        uScale: number,
        vScale: number,
        invertY: boolean | null,
        noMipmapOrOptions: boolean | null
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.size = size;
        this.hasAlpha = hasAlpha;
        this.isDesignTexture = isDesignTexture;
        this.generateMipMaps = generateMipMaps;
        this.addressMode = addressMode;
        this.samplingMode = samplingMode;
        this.uScale = uScale;
        this.vScale = vScale;
        this.invertY = invertY;
        this.noMipmapOrOptions = noMipmapOrOptions;
    }

    static fromJSON(data: any): Texture {
        return new Texture(
            data.id,
            data.name,
            data.type,
            data.size,
            data.hasAlpha,
            data.isDesignTexture,
            data.generateMipMaps,
            data.addressMode,
            data.samplingMode,
            data.uScale,
            data.vScale,
            data.invertY,
            data.noMipmapOrOptions
        );
    }
}

export class Variant {
    id: number;
    mapping: Record<string, number>;

    constructor(id: number, mapping: Record<string, number>) {
        this.id = id;
        this.mapping = mapping;
    }

    static fromJSON(data: any): Variant {
        return new Variant(data.id, data.mapping);
    }
}
