'use client'

import BabylonScene from "@/components/babylon/babylon-scene";
import {DesignCanvas} from "@/components/canvas/design-canvas";
import {ProductController} from "@/components/controller/product/product-controller";
import {DesignController} from "@/components/controller/design/design-controller";
import React from "react";
import Loading from "@/app/loading";
import ErrorPage from "@/app/error";
import {useStudioModel} from "@/hooks/dstudio/use-studio-model";

export default function Home() {

    const {loading, error} = useStudioModel('e1f4a3f9-9f3b-4b4b-991e-d58f4b6854c3', '2D');

    if (loading) return <Loading />;

    if (error) return (<ErrorPage error={new Error(error || "Unknown error")} reset={() => window.location.reload()}/>);

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
