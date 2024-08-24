import classNames from "classnames";
import React from "react";
import {ImageController} from "@/components/controller/design/image/ImageController";
import {TextController} from "@/components/controller/design/text/TextController";
import {DesignListItems} from "@/components/controller/design/list-item/DesignListItem";

export function DesignController() {

    const _className = classNames(
        'w-full flex',
        'border-black border-2 bg-pink-200',
        'rounded-md',
        'items-center justify-center'
    );

    return (
        <div className='w-full h-6/10'>
            <div className='w-full h-full'>
                <div className='w-full h-auto flex'>
                    <div className={_className}>
                        <ImageController/>
                        <TextController/>
                    </div>
                </div>
                <DesignListItems/>
            </div>
        </div>
    );

}
