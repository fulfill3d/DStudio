import {Vector3} from "@babylonjs/core";

export interface IBCameraOption {
    name: string;
    type: string;
    alpha: number;
    beta: number;
    radius: number;
    target: Vector3;
    upperRadiusLimit: number;
    lowerRadiusLimit: number;
    upperBetaLimit: number;
    lowerBetaLimit: number;
}
