import {Engine, Nullable, Scene} from "@babylonjs/core";
import {IBSceneOption} from "@/interfaces/model/babylon/i-b-scene-option";

export class BScene extends Scene{
    private static instance: Nullable<BScene> = null;
    private static options: Nullable<IBSceneOption> = null;

    private constructor(engine: Engine) {
        super(engine);
    }

    static initialize(engine: Engine): void{
        if(!BScene.instance){
            BScene.instance = new BScene(engine);
        }else{
            throw new Error("Scene is already initialized");
        }

        const options = BScene.getOptions();
        const scene = BScene.getInstance();

        scene.collisionsEnabled = options.collisionsEnabled;
        scene.clearColor = options.clearColor;

    }

    static getInstance(): BScene{
        if (!BScene.instance){
            throw new Error("Scene has not been initialized. Call BEngine.initialize with the engine first.");
        }
        return BScene.instance;
    }

    static setOptions(options: IBSceneOption){
        BScene.options = options;
    }

    static getOptions(): IBSceneOption{
        if (!BScene.options){
            throw new Error("Options has not been set");
        }
        return BScene.options;
    }

}
