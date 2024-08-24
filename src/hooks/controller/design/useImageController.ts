import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {RootState} from "@/store/store";
import {FCanvas} from "@/models/fabric/FCanvas";
import {DesignManager} from "@/models/design/DesignManager";
import {addCustomDesign} from "@/store/slice/design";

export const useImageController = (hiddenFileInput: React.MutableRefObject<HTMLInputElement | null>) => {
    const dispatch = useAppDispatch();
    const isFabricCanvasReady = useSelector((state: RootState) => state.canvas.isFabricCanvasReady);
    // const canvasOptions = CanvasManager.getOptions();
    const canvasOptions = FCanvas.getOptions();

    const handleUploadImageClick = useCallback(() => {
        if (hiddenFileInput.current){
            hiddenFileInput.current.click();
        }
    }, [hiddenFileInput]);

    const handleFileSelect = useCallback((event: any) => {
        const file = event.target.files[0];

        if (isFabricCanvasReady && canvasOptions){
            DesignManager.loadImage(file, canvasOptions)
                .then((design) => dispatch(addCustomDesign(design)))
                //TODO: handle error
                .catch(() => {})
        }

    }, [isFabricCanvasReady, canvasOptions, dispatch]);

    return {
        handleUploadImageClick,
        handleFileSelect
    }
}
