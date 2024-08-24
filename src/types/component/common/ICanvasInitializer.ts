import React from "react";

export interface ICanvasInitializer {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
}
