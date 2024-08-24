import React from "react";
import BabylonScene from "@/components/babylon/BabylonScene";
import {useStudioModel} from "@/hooks/dstudio/useStudioModel";
import {DesignCanvas} from "@/components/canvas/DesignCanvas";
import {ProductController} from "@/components/controller/product/ProductController";
import {DesignController} from "@/components/controller/design/DesignController";

export function DesignStudio(){

    useStudioModel();

    return (
        <div className='w-dvw h-dvh flex flex-col bg-white'>
            <div className='w-full h-24 p-4 flex items-center justify-center'>
                <div
                    className='w-full h-full flex rounded-md border-2 border-black items-center justify-center bg-yellow-300'>
                    <h6>
                        Design Studio
                    </h6>
                </div>
            </div>
            <div className='flex flex-row w-full flex-grow'>
                <div className='flex flex-col w-6/10 items-center justify-center'>
                    <BabylonScene />
                    <DesignCanvas />
                </div>
                <div className='flex flex-col w-4/10 h-full p-4 items-center justify-center'>
                    <ProductController />
                    <DesignController />
                </div>
            </div>
        </div>
    )
}
