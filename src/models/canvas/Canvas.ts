import {ICanvasOptions} from "fabric/fabric-impl";

interface ICanvas extends ICanvasOptions{
    scaleFactor: number;
    width: number;
    height: number;
    intersectionMode: 'CLIP'
}

export interface Canvas extends ICanvas{}

export class Canvas{
    constructor(canvas: ICanvas) {
        this.scaleFactor = canvas.scaleFactor;
        this.width = canvas.width;
        this.height = canvas.height;
        this.intersectionMode = canvas.intersectionMode;
    }
}
