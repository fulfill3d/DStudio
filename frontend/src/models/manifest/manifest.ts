import {ProductManifest} from "@/models/manifest/product-manifest";
import {SceneManifest} from "@/models/manifest/scene-manifest";
import {Canvas} from "@/models/canvas/canvas";

export class Manifest {
    id: string;
    name: string;
    partitionKey: string;
    product: ProductManifest | null;
    scene: SceneManifest | null;
    canvas: Canvas | null;

    constructor(
        id: string,
        name: string,
        partitionKey: string,
        product: ProductManifest | null,
        scene: SceneManifest | null,
        canvas: Canvas | null) {
        this.id = id;
        this.name = name;
        this.partitionKey = partitionKey;
        this.product = product;
        this.scene = scene;
        this.canvas = canvas;
    }

    static fromJSON(data: any): Manifest {
        const product = data.product ? ProductManifest.fromJSON(data.product) : null;
        const scene = data.scene ? SceneManifest.fromJSON(data.scene) : null;
        const canvas = data.canvas ? new Canvas(data.canvas) : null;
        return new Manifest(
            data.id,
            data.name,
            data.partitionKey,
            product,
            scene,
            canvas
        );
    }
}
