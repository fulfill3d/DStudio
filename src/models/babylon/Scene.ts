import {Scene as BabylonScene, Color4} from "@babylonjs/core";
import {Camera, CameraSettingsType} from "@/models/babylon/Camera";
import {Light, LightSettingsType} from "@/models/babylon/Light";

export interface SceneSettingsType {
    collisionsEnabled: boolean;
    clearColor: number[];
    camera: CameraSettingsType;
    lights: LightSettingsType[];
}

export class Scene{

    private readonly collisionsEnabled: boolean;
    private readonly clearColor: number[];
    private readonly camera: Camera;
    private readonly lights: Light[];

    constructor(settings: SceneSettingsType) {
        this.collisionsEnabled = settings.collisionsEnabled;
        this.clearColor = settings.clearColor;
        this.camera = new Camera(settings.camera);
        this.lights = settings.lights.map((light: LightSettingsType) => { return new Light(light); })
    }

    setup(scene: BabylonScene) {
        scene.collisionsEnabled = this.collisionsEnabled;
        const r = this.clearColor[0];
        const g = this.clearColor[1];
        const b = this.clearColor[2];
        const a = this.clearColor[3];
        scene.clearColor = Color4.FromInts(r, g, b, a);
        this.camera.setup(scene);
        this.lights.forEach(light => { light.setup(scene); })
    }

}
