import {useAppDispatch} from "@/hooks/useAppDispatch";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {ICanvasInitializer} from "@/types/component/common/ICanvasInitializer";
import {RootState} from "@/store/store";
import {createBabylon, destroyBabylon} from "@/store/slice/studio";

export const BabylonInitializer: React.FC<ICanvasInitializer> = ({canvasRef}) => {
    const dispatch = useAppDispatch();
    const isStudioModelReady = useSelector((state: RootState) => state.studio.isStudioModelReady);

    useEffect(() => {
        const { current: canvas } = canvasRef;
        if (!canvas || !isStudioModelReady) return;

        dispatch(createBabylon(canvas));

        return () => {
            dispatch(destroyBabylon())
        };
    }, [dispatch, isStudioModelReady, canvasRef]);

    return null;

}
