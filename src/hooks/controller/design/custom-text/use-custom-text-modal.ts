import {useCallback, useState} from "react";
import {fabric} from "fabric";
import {useAppDispatch} from "@/hooks/use-app-dispatch";
import {FCanvas} from "@/models/fabric/f-canvas";
import {IColorListType} from "@/types/utils/i-color-list-type";
import {DesignManager} from "@/models/design/design-manager";
import {addCustomDesign} from "@/store/slice/design";

export const useCustomTextModal = (onClose: () => void) => {
    const dispatch = useAppDispatch();
    // const canvasOptions = CanvasManager.getOptions();
    const canvasOptions = FCanvas.getOptions();
    //TODO: Default Text Instance
    const defaultFontSize = 24;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const defaultTextObject = {
        text: '',
        fill: '#000000',
        fontFamily: 'Times New Roman',
        fontSize: canvasOptions? defaultFontSize * canvasOptions.scaleFactor : defaultFontSize,
        fontStyle: 'normal',
        fontWeight: 'normal',
        hasControls: true,
        splitByGrapheme: false,
        controls: { ...fabric.Textbox.prototype.controls, deleteControl: fabric.Object.prototype.controls.deleteControl }
    }
    const [visibleFontSize, setVisibleFontSize] = useState(defaultFontSize);
    const [textObject, setTextObject] = useState(defaultTextObject);

    const handleInputChange = useCallback((event: any) => {
        setTextObject({ ...textObject, text: event.target.value });
    }, [textObject, setTextObject]);

    const colorClickCallback = useCallback((color: IColorListType) => {
        setTextObject({ ...textObject, fill: color.hex });
    }, [textObject]);

    const fontFamilyClickCallback = useCallback((name: string) => {
        setTextObject({ ...textObject, fontFamily: name });
    }, [textObject]);

    const handleFontSizeChange = useCallback((event: any) => {
        const fontSizeVisible = parseInt(event.target.value, 10);
        const fontSizeReal = canvasOptions? fontSizeVisible * canvasOptions.scaleFactor : fontSizeVisible;
        setVisibleFontSize(fontSizeVisible);
        setTextObject({ ...textObject, fontSize: fontSizeReal });
    }, [textObject, canvasOptions]);

    const handleFontStyleChange = useCallback((newStyle: string) => {
        setTextObject({ ...textObject, fontStyle: newStyle });
    }, [textObject]);

    const handleFontWeightChange = useCallback((event: any) => {
        setTextObject({ ...textObject, fontWeight: event.target.value });
    }, [textObject]);

    const addDesignTextCallback = useCallback(() => {
        if (canvasOptions){
            DesignManager.loadText(textObject, canvasOptions)
                .then((design) => dispatch(addCustomDesign(design)))
                //TODO: handle error
                .catch(() => {})
        }
        onClose();

    }, [canvasOptions, dispatch, textObject, onClose]);

    return {
        textObject,
        visibleFontSize,
        handleInputChange,
        colorClickCallback,
        fontFamilyClickCallback,
        handleFontSizeChange,
        handleFontStyleChange,
        handleFontWeightChange,
        addDesignTextCallback
    }
}
