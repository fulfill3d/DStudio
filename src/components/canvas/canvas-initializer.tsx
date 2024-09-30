import React, {useEffect} from "react";
import {useAppDispatch} from "@/hooks/use-app-dispatch";
import {useSelector} from "react-redux";
import {ICanvasInitializer} from "@/types/component/common/i-canvas-initializer";
import {RootState} from "@/store/store";
import {initFabricCanvas} from "@/store/slice/canvas";
import {removeCustomDesign} from "@/store/slice/design";

export const CanvasInitializer: React.FC<ICanvasInitializer> = ({canvasRef}) => {
    const dispatch = useAppDispatch();
    const isFabricSingletonCreated = useSelector((state: RootState) => state.canvas.isFabricSingletonCreated);

    useEffect(() => {
        const { current: canvas } = canvasRef;
        if (!canvas || !isFabricSingletonCreated) return;

        dispatch(initFabricCanvas({
            reference: canvas,
            dispatch: (id: string) => dispatch(removeCustomDesign(id))
        }));

    }, [dispatch, isFabricSingletonCreated, canvasRef]);

    return null;
}
