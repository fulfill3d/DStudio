export class CanvasManifest {
    scaleFactor: number;
    width: number;
    height: number;
    intersectionMode: string;

    constructor(scaleFactor: number, width: number, height: number, intersectionMode: string) {
        this.scaleFactor = scaleFactor;
        this.width = width;
        this.height = height;
        this.intersectionMode = intersectionMode;
    }

    static fromJSON(data: any): CanvasManifest {
        return new CanvasManifest(
            data.scaleFactor,
            data.width,
            data.height,
            data.intersectionMode
        );
    }
}
