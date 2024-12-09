import {PBRMaterial} from "@babylonjs/core";
import {IBMaterialOption} from "@/interfaces/model/babylon/i-b-material-option";
import {IBDynamicTextureOption} from "@/interfaces/model/babylon/i-b-dynamic-texture-option";
import {IBTextureOption} from "@/interfaces/model/babylon/i-b-texture-option";
import {BDynamicTexture} from "@/models/babylon/b-dynamic-texture";
import {BTexture} from "@/models/babylon/b-texture";
import {BScene} from "@/models/babylon/b-scene";

export class BMaterial extends PBRMaterial{
    private readonly options: IBMaterialOption;
    private readonly isDesignMaterial: boolean;
    private texture: BDynamicTexture | BTexture | undefined;

    constructor(options: IBMaterialOption){
        super(options.name, BScene.getInstance());
        this.options = options;
        this.isDesignMaterial = options.isDesignMaterial;
        this.setOptions();
    }

    setOptions(){
        this.id = this.options.id;
        this.name = this.options.name;

        if (this.options.directIntensity){this.directIntensity = this.options.directIntensity;}
        if (this.options.emissiveIntensity){this.emissiveIntensity = this.options.emissiveIntensity;}
        if (this.options.environmentIntensity){this.environmentIntensity = this.options.environmentIntensity;}
        if (this.options.specularIntensity){this.specularIntensity = this.options.specularIntensity;}
        if (this.options.metallic){this.metallic = this.options.metallic;}
        if (this.options.roughness){this.roughness = this.options.roughness;}
        if (this.options.ambientColor){this.ambientColor = this.options.ambientColor;}
        if (this.options.albedoColor){this.albedoColor = this.options.albedoColor;}
        if (this.options.reflectivityColor){this.reflectivityColor = this.options.reflectivityColor;}
        if (this.options.reflectionColor){this.reflectionColor = this.options.reflectionColor;}
        if (this.options.emissiveColor){this.emissiveColor = this.options.emissiveColor;}
        if (this.options.microSurface){this.microSurface = this.options.microSurface;}

    }

    generateTexture(){
        if (this.isDesignMaterial){
            this.texture = new BDynamicTexture(this.options.textureOptions as IBDynamicTextureOption);
        }
        else{
            this.texture = new BTexture(this.options.textureOptions as IBTextureOption);
        }
    }

}
