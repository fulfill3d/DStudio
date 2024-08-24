import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useCallback} from "react";
import {removeCustomDesign} from "@/store/slice/design";
import {RootState} from "@/store/store";

export const useDesignList = () => {

    const dispatch = useAppDispatch();
    const designList = useSelector((state: RootState) => state.design.designBlueprints);

    const handleRemove = useCallback((id: string) => {
        dispatch(removeCustomDesign(id));
    }, [dispatch]);

    return {
        designList,
        handleRemove
    }
}
