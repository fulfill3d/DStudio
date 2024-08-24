import {useEffect} from "react";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {Studio} from "@/models/babylon/Studio";
import {product_manifest} from "@/utils/product_manifest";
import {scene_manifest} from "@/utils/scene_manifest";
import {createStudioSingleton} from "@/store/slice/studio";
import {createFabricSingleton} from "@/store/slice/canvas";
import {canvas_options} from "@/utils/canvas_options";

export const useStudioModel = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const studio = new Studio(product_manifest, scene_manifest);

        dispatch(createStudioSingleton(studio));
        dispatch(createFabricSingleton(canvas_options));

    }, [dispatch]);
}
