'use client'

import BabylonScene from "@/components/babylon/babylon-scene";
import {DesignCanvas} from "@/components/canvas/design-canvas";
import {ProductController} from "@/components/controller/product/product-controller";
import {DesignController} from "@/components/controller/design/design-controller";
import React from "react";
import {useStudioModel} from "@/hooks/dstudio/use-studio-model";

export default function Home() {

    useStudioModel();

  return (
      <div className="w-full h-full flex flex-col bg-white">
          <div className='flex flex-row w-full flex-grow'>
              <div className='flex flex-col w-full items-center justify-center'>
                  <BabylonScene/>
                  <DesignCanvas/>
              </div>
              <div className='flex flex-col w-4/10 h-full p-4 items-center justify-center'>
                  <ProductController/>
                  <DesignController/>
              </div>
          </div>
      </div>
  );
}
