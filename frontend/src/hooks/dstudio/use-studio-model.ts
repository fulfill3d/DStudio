import {useEffect} from "react";
import {useAppDispatch} from "@/hooks/use-app-dispatch";
import {Studio} from "@/models/babylon/studio";
import {createStudioSingleton} from "@/store/slice/studio";
import {createFabricSingleton} from "@/store/slice/canvas";
import {useGetManifest} from "@/hooks/common/use-get-manifest";

export const useStudioModel = (id: string, partitionKey: string) => {

    const {manifest, loading, error} = useGetManifest(id, partitionKey);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (manifest && manifest.canvas){
            const studio = new Studio(manifest.product, manifest.scene);

            dispatch(createStudioSingleton(studio));
            dispatch(createFabricSingleton(manifest.canvas));
        }

    }, [dispatch, manifest]);

    return { loading, error };
}
