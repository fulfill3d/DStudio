import {Scene} from "@babylonjs/core";
import {BEngine} from "@/models/babylon/b-engine";
import {Studio} from "@/models/babylon/studio";

export class StudioManager {
    private static studio_instance: Studio | null;
    private static babylon_scene_instance: Scene | null;

    static babylonFactory() {

        const engine = BEngine.getInstance();
        const scene = new Scene(engine, undefined);

        const studioInstance = this.getStudioInstance();

        if (studioInstance){
            if (scene.isReady()){
                studioInstance.onSceneReady(scene);
            }else{
                scene.onReadyObservable.addOnce((scene: Scene) => studioInstance.onSceneReady(scene))
            }
        }

        engine.runRenderLoop(() => scene.render());
        window.addEventListener('resize', () => engine.resize());

        // this.createEngineSingleton(engine);
        this.createSceneSingleton(scene);
    }

    static babylonDestroy(){

        const engine = BEngine.getInstance();
        const scene = this.getSceneInstance();

        if (engine && scene){
            engine.stopRenderLoop(() => scene.render());
            scene.dispose();
            engine.dispose();
            window.removeEventListener("resize", () => engine.resize());
        }

    }

    static createStudioSingleton(studio: Studio) {
        this.studio_instance = studio;
    }

    static createSceneSingleton(scene: Scene){
        this.babylon_scene_instance = scene;
    }

    static getStudioInstance() {
        return this.studio_instance;
    }

    static getSceneInstance(){
        return this.babylon_scene_instance;
    }
}
