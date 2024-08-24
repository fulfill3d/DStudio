import React from "react";
import {useVariants} from "@/hooks/controller/product/useVariants";
import {PngStack} from "@/components/common/PngStack";

export function Variant(){

    const {variant_data} = useVariants();

    return (
        <div className={'flex flex-col w-96 h-auto items-center justify-center'}>
            <h1>Variant Colors</h1>
            <div
                className={'flex overflow-x-auto w-full max-w-full'}
                style={{scrollbarWidth: 'none'}}
            >
                {variant_data.map((variant, index) => (
                    <PngStack key={index} variant={variant} size={35}/>
                ))}
            </div>
        </div>
    );
}
