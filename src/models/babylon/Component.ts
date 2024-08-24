import {Scene} from "@babylonjs/core";
import {Mesh, MeshSettingsType} from "@/models/babylon/Mesh";

export interface ComponentSettingsType {
    id: string;
    name: string;
    is_design_component: boolean;
    mesh: MeshSettingsType;
}

export class Component {
    private readonly id: string;
    private readonly name: string;
    private readonly is_design_component: boolean;
    private readonly mesh: Mesh;

    constructor(settings: ComponentSettingsType){
        this.id = settings.id;
        this.name = settings.name;
        this.is_design_component = settings.is_design_component;
        this.mesh = new Mesh(settings.mesh);
    }

    async loadComponentIntoScene(scene: Scene){
        await this.mesh.loadMeshIntoScene(scene);
    }

    async updateTexture(blob: Blob, scene: Scene){
        try{
            await this.mesh.updateTexture(blob, scene);
        }catch (error){
            throw error;
        }
    }

    async updateVariant(src: string){
        await this.mesh.updateVariant(src);
    }

    isDesignComponent(): boolean {
        return this.is_design_component;
    }

    getName(): string {
        return this.name;
    }
}
