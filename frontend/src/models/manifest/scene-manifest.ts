export class Camera {
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

    constructor(
        name: string,
        type: string,
        alpha: number,
        beta: number,
        radius: number,
        target: number[],
        upperRadiusLimit: number,
        lowerRadiusLimit: number,
        upperBetaLimit: number,
        lowerBetaLimit: number
    ) {
        this.name = name;
        this.type = type;
        this.alpha = alpha;
        this.beta = beta;
        this.radius = radius;
        this.target = target;
        this.upperRadiusLimit = upperRadiusLimit;
        this.lowerRadiusLimit = lowerRadiusLimit;
        this.upperBetaLimit = upperBetaLimit;
        this.lowerBetaLimit = lowerBetaLimit;
    }

    static fromJSON(data: any): Camera {
        return new Camera(
            data.name,
            data.type,
            data.alpha,
            data.beta,
            data.radius,
            data.target,
            data.upperRadiusLimit,
            data.lowerRadiusLimit,
            data.upperBetaLimit,
            data.lowerBetaLimit
        );
    }
}

export class Light {
    type: string;
    name: string;
    direction: number[];
    intensity: number;

    constructor(type: string, name: string, direction: number[], intensity: number) {
        this.type = type;
        this.name = name;
        this.direction = direction;
        this.intensity = intensity;
    }

    static fromJSON(data: any): Light {
        return new Light(
            data.type,
            data.name,
            data.direction,
            data.intensity
        );
    }
}

export class SceneManifest {
    collisionsEnabled: boolean;
    clearColor: number[];
    camera: Camera;
    lights: Light[];

    constructor(collisionsEnabled: boolean, clearColor: number[], camera: Camera, lights: Light[]) {
        this.collisionsEnabled = collisionsEnabled;
        this.clearColor = clearColor;
        this.camera = camera;
        this.lights = lights;
    }

    static fromJSON(data: any): SceneManifest {
        return new SceneManifest(
            data.collisionsEnabled,
            data.clearColor,
            Camera.fromJSON(data.camera),
            data.lights.map((light: any) => Light.fromJSON(light))
        );
    }
}
