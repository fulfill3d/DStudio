import {ArcRotateCamera, Nullable, Scene, Tools, Vector3} from "@babylonjs/core";

export interface CameraSettingsType {
    name: string;
    type: string;
    alpha: number;
    beta: number;
    radius: number;
    target: number[];
    upperRadiusLimit: number;
    lowerRadiusLimit: number;
    upperBetaLimit: number;
    lowerBetaLimit: number;
}

export class Camera{
    private readonly name: string;
    private readonly type: string;
    private readonly alpha: number;
    private readonly beta: number;
    private readonly radius: number;
    private readonly target: Vector3;
    private babylon_camera: Nullable<ArcRotateCamera>;
    private readonly upperRadiusLimit: number;
    private readonly lowerRadiusLimit: number;
    private readonly upperBetaLimit: number;
    private readonly lowerBetaLimit: number;
    constructor(settings: CameraSettingsType) {
        this.name = settings.name;
        this.type = settings.type;
        this.alpha = Tools.ToRadians(settings.alpha);
        this.beta = Tools.ToRadians(settings.beta);
        this.radius = settings.radius;
        this.target = Vector3.FromArray(settings.target);
        this.babylon_camera = null;
        this.upperRadiusLimit = settings.upperRadiusLimit;
        this.lowerRadiusLimit = settings.lowerRadiusLimit;
        this.upperBetaLimit = Tools.ToRadians(settings.upperBetaLimit);
        this.lowerBetaLimit = Tools.ToRadians(settings.lowerBetaLimit);
    }

    setup(scene: Scene){
        let _cam: ArcRotateCamera;
        const canvas = scene.getEngine().getRenderingCanvas();
        switch(this.type){
            case 'ArcRotateCamera':
                _cam = new ArcRotateCamera(
                    this.name,
                    this.alpha,
                    this.beta,
                    this.radius,
                    this.target,
                    scene)
                _cam.upperRadiusLimit = this.upperRadiusLimit;
                _cam.lowerRadiusLimit = this.lowerRadiusLimit;
                _cam.upperBetaLimit = this.upperBetaLimit;
                _cam.lowerBetaLimit = this.lowerBetaLimit;
                _cam.attachControl(canvas, true);
                this.babylon_camera = _cam;
                break;
            default:
                break
        }
    }
}
