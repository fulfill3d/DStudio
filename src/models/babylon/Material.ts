import {Color3, Scene, StandardMaterial} from "@babylonjs/core";
import {Texture} from "@/models/babylon/Texture";

export interface MaterialSettingsType {
    id: string
    name: string
    type: string
    diffuseColor: number[];
    specularColor: number[];
    specularPower: number;
    zOffset: number;
    hasTexture: boolean;
    hasColor: boolean;
    texture: any;
    color: any;
}

export class Material{

    private readonly id: string;
    private readonly type: string;
    private readonly name: string;
    private readonly diffuseColor: Color3;
    private readonly specularColor: Color3;
    private readonly specularPower: number;
    private readonly zOffset: number;
    private readonly hasTexture: boolean;
    private readonly hasColor: boolean;
    private readonly texture: Texture | null;
    private readonly color: Color3 | null;
    private babylon_material: StandardMaterial | undefined;

    constructor(settings: MaterialSettingsType) {
        this.id = settings.id;
        this.type = settings.type || 'DefaultType';
        this.name = settings.name || 'DefaultName';
        this.diffuseColor = this.createColor3(settings.diffuseColor, [1, 1, 1]); // Default to white if not provided
        this.specularColor = this.createColor3(settings.specularColor, [1, 1, 1]); // Default to white if not provided
        this.specularPower = settings.specularPower || 0;
        this.zOffset = settings.zOffset || 0;
        this.hasTexture = settings.hasTexture || false;
        this.hasColor = settings.hasColor || false;
        this.texture = this.hasTexture ? new Texture(settings.texture) : null;
        this.color = this.hasColor ? this.createColor3(settings.color, [1, 1, 1]) : null;
    }

    createColor3(colorArray: number[], defaultColor: number[]) {
        if (Array.isArray(colorArray) && colorArray.length === 3) {
            return new Color3(colorArray[0], colorArray[1], colorArray[2]);
        }
        return new Color3(defaultColor[0], defaultColor[1], defaultColor[2]);
    }

    async createBabylonMaterial(scene: Scene){
        this.babylon_material = new StandardMaterial(this.name, scene);
        if (this.hasTexture){
            await this.texture?.loadBabylonTexture(scene);
            if (this.babylon_material && this.texture){
                this.babylon_material.diffuseTexture = this.texture.getBabylonTexture();
            }
        }
        this.babylon_material.zOffset = this.zOffset;
        this.babylon_material.diffuseColor = this.diffuseColor;
        this.babylon_material.specularColor = this.specularColor;
        this.babylon_material.specularPower = this.specularPower;
    }

    async updateTexture(blob: Blob, scene: Scene){
        await this.texture?.updateTexture(blob, scene)
            .then((texture) => {
                if (this.babylon_material){
                    this.babylon_material.diffuseTexture = texture;
                }
            })
            .catch(error => { throw error })
    }

    async updateVariant(src: string){
        await this.texture?.drawDesignOnBabylonTexture(src);
    }

    getBabylonMaterial(): StandardMaterial | null{
        return this.babylon_material ?? null;
    }
}
