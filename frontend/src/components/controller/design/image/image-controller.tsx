import React, {useRef} from "react";
import {useImageController} from "@/hooks/controller/design/use-image-controller";
import Button from "@/components/common/button";

export function ImageController() {

    const hiddenFileInput = useRef<HTMLInputElement | null>(null);

    const {
        handleUploadImageClick,
        handleFileSelect
    } = useImageController(hiddenFileInput)

    return (
        <div className='w-auto h-auto'>
            <input
                className='hidden'
                type="file"
                ref={hiddenFileInput}
                accept="image/*"
                onChange={handleFileSelect}
            />
            <Button
                buttonText="Image"
                rounded='md'
                size='sm'
                color='cyan'
                className='m-2'
                callback={handleUploadImageClick}
            />
        </div>
    );
}
