import {Engine, Nullable} from "@babylonjs/core";

export class BEngine extends Engine{
    private static instance: Nullable<BEngine> = null;
    private static canvas: Nullable<HTMLCanvasElement> = null;

    private constructor(canvas: HTMLCanvasElement) {
        super(canvas, true);
    }

    public static initialize(canvas: HTMLCanvasElement): void {
        BEngine.canvas = canvas;
        if (!BEngine.instance) {
            BEngine.instance = new BEngine(BEngine.getCanvas());
        }
    }

    public static getInstance(): Engine {
        if (!BEngine.instance) {
            throw new Error("Engine has not been initialized. Call BEngine.initialize with a canvas first.");
        }
        return BEngine.instance;
    }

    public static setCanvas(canvas: HTMLCanvasElement): void {
        BEngine.canvas = canvas;
        if (BEngine.instance) {
            BEngine.instance.dispose(); // Dispose of the current instance if it exists
            BEngine.instance = new BEngine(BEngine.canvas); // Reinitialize the engine with the new canvas
            // Optionally, perform any reinitialization logic here
        } else {
            // If the engine hasn't been initialized yet, just update the canvas
            BEngine.initialize(canvas);
        }
    }

    public static getCanvas(): HTMLCanvasElement {
        if (!BEngine.canvas) {
            throw new Error("Canvas has not been provided")
        }
        return BEngine.canvas;
    }
}
