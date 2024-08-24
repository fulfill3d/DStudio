import React, { useRef } from 'react';
import {BabylonInitializer} from "./BabylonInitializer";

const BabylonScene = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <div className='size-full items-center justify-center'>
            <BabylonInitializer canvasRef={canvasRef}/>
            <canvas ref={canvasRef} id={"my-model"} className='size-full outline-none'/>
        </div>
    );
}

export default BabylonScene;
