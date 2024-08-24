import {ArcRotateCamera, Nullable} from "@babylonjs/core";
import {IBCameraOption} from "@/types/model/babylon/IBCameraOption";
import {BScene} from "@/models/babylon/BScene";
import {BEngine} from "@/models/babylon/BEngine";

export class BCamera extends ArcRotateCamera {
    private static instance: Nullable<BCamera> = null;
    private static options: Nullable<IBCameraOption> = null;

    private constructor() {
        const options: IBCameraOption = BCamera.getOptions();
        const scene: BScene = BScene.getInstance();
        super(
            options.name,
            options.alpha,
            options.beta,
            options.radius,
            options.target,
            scene
        );
    }

    static initialize(){
        if (!BCamera.instance){
            BCamera.instance = new BCamera();
            BCamera.setBCameraProperties();
        }
    }

    static getInstance(){
        if (!BCamera.instance){
            throw new Error('Camera has not been initialized');
        }
        return BCamera.instance;
    }

    static setOptions(options: IBCameraOption){
        BCamera.options = options;
    }

    static getOptions(){
        if (!BCamera.options){
            throw new Error('Camera options not available');
        }
        return BCamera.options;
    }

    static setBCameraProperties(){
        const canvas = BEngine.getCanvas();
        const options = BCamera.getOptions();
        const instance = BCamera.getInstance();

        instance.upperRadiusLimit = options.upperRadiusLimit;
        instance.lowerRadiusLimit = options.lowerRadiusLimit;
        instance.upperBetaLimit = options.upperBetaLimit;
        instance.lowerBetaLimit = options.lowerBetaLimit;

        instance.attachControl(canvas, true);
    }
}
