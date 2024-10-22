import React, {useRef} from 'react';
import {CanvasInitializer} from "./canvas-initializer";

export const DesignCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='rounded-md border-2 border-black p-4 bg-violet-300'>
                <div className='w-auto h-auto outline-none border border-black bg-white'>
                    <CanvasInitializer
                        canvasRef={canvasRef}
                    />
                    <canvas ref={canvasRef}/>
                </div>
            </div>
        </div>
    );
}
