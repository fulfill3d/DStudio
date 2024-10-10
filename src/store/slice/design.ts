import {createAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CustomDesign} from "@/models/design/custom-design";
import {DesignManager} from "@/models/design/design-manager";
import {IDesignBlueprint} from "@/interfaces/design/i-design-blueprint";
import {FCanvas} from "@/models/fabric/f-canvas";

export const addCustomDesignBlueprint = createAction<IDesignBlueprint>('design/addCustomDesignBlueprint');
export const removeCustomDesignBlueprint = createAction<string>('design/removeCustomDesignBlueprint');

export const addCustomDesign = createAsyncThunk(
    'design/addCustomDesign',
    (design: CustomDesign, { dispatch }) => {
        FCanvas.addDesign(design);
        // CanvasManager.addDesign(design);
        const blueprint = DesignManager.addDesign(design);
        dispatch(addCustomDesignBlueprint(blueprint));
    }
);

export const removeCustomDesign = createAsyncThunk(
    'design/removeCustomDesign',
    (designId: string, { dispatch }) => {
        FCanvas.removeDesign(designId);
        // CanvasManager.removeDesign(designId);
        DesignManager.removeDesign(designId);
        dispatch(removeCustomDesignBlueprint(designId));
    }
);

export const design = createSlice({
    name: 'design',
    initialState: {
        designBlueprints: [] as IDesignBlueprint[],
    },
    reducers: {
        //TODO: unused parameters
        addCustomDesignBlueprint: (state, action: PayloadAction<IDesignBlueprint>) => {
            console.log('addCustomDesignBlueprint');
            state.designBlueprints.push(action.payload);
        },
        removeCustomDesignBlueprint: (state, action: PayloadAction<string>) => {
            console.log('removeCustomDesignBlueprint');
            state.designBlueprints = state.designBlueprints.filter(design => design.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCustomDesign.fulfilled, (state, action) => {
                // Handle any specific logic if needed when the async operation is successful
                console.log('addCustomDesign.fulfilled');
            })
            .addCase(removeCustomDesign.fulfilled, (state, action) => {
                // Handle any specific logic if needed when the async operation is successful
                console.log('removeCustomDesign.fulfilled');
            })
    }
});


export default design.reducer;
