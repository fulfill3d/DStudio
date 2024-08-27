import {useCallback} from "react";
import {StudioManager} from "@/models/babylon/studio-manager";

export const useVariantSelect = () => {

    return useCallback(async (id: number) => {
        const studioInstance = StudioManager.getStudioInstance();
        if (studioInstance){
            await studioInstance.updateVariant(id);
        }
    }, []);
}
