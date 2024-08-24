import {AbstractMesh, Scene, SceneLoader} from "@babylonjs/core";
import {Material, MaterialSettingsType} from "@/models/babylon/Material";

export interface MeshSettingsType {
    id: string;
    name: string;
    root_uri: string;
    uri: string;
    material: MaterialSettingsType;
}

export class Mesh{
    private readonly id: string;
    private readonly name: string;
    private readonly root_uri: string;
    private readonly uri: string;
    private readonly material: Material;
    private babylon_meshes: AbstractMesh[];
    constructor(settings: MeshSettingsType) {
        this.id = settings.id;
        this.name = settings.name;
        this.root_uri = settings.root_uri;
        this.uri = settings.uri;
        this.material = new Material(settings.material);
        this.babylon_meshes = [];
    }

    async loadMeshIntoScene(scene: Scene) {
        try {
            const _result = await SceneLoader.ImportMeshAsync(
                this.name,
                this.root_uri,
                this.uri,
                scene
            );

            await this.material.createBabylonMaterial(scene);

            for (const mesh of _result.meshes) {
                mesh.material = this.material.getBabylonMaterial();
                this.babylon_meshes.push(mesh);
            }

        } catch (e) {
            console.error(e);
        }
    }

    async updateTexture(blob: Blob, scene: Scene) {
        try {
            await this.material.updateTexture(blob, scene);
        }catch (error){
            throw error;
        }
    }

    async updateVariant(src: string){
        await this.material.updateVariant(src);
    }

    getBabylonMeshes(){
        return this.babylon_meshes;
    }

}
