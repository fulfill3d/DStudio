import {HemisphericLight, Scene, Vector3} from "@babylonjs/core";

export interface LightSettingsType {
    name: string
    type: string;
    direction: number[];
    intensity: number;
}

export class Light{

    private readonly name: string;
    private readonly type: string;
    private readonly direction: Vector3;
    private readonly intensity: number;

    constructor(settings: LightSettingsType) {
        this.name = settings.name;
        this.type = settings.type;
        this.direction = Vector3.FromArray(settings.direction);
        this.intensity = settings.intensity;
    }
    setup(scene: Scene){
        switch (this.type){
            case 'HemisphericLight':
                const _light = new HemisphericLight(
                    this.name,
                    this.direction,
                    scene)
                _light.intensity = this.intensity;
                break;
            default:
                break;
        }
    }
}
