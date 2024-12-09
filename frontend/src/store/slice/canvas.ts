import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Canvas} from "@/models/canvas/canvas";
import {DesignManager} from "@/models/design/design-manager";
import {IInitFabricCanvas} from "@/interfaces/component/canvas/i-init-fabric-canvas";
import {FCanvas} from "@/models/fabric/f-canvas";

export const fabricSingletonCreated = createAction('canvas/fabricSingletonCreated');
export const fabricCanvasInitialized = createAction('canvas/fabricCanvasInitialized');

export const createFabricSingleton = createAsyncThunk(
    'canvas/createFabricSingleton',
    (options: Canvas, { dispatch }) => {
        FCanvas.setOptions(options);
        dispatch(fabricSingletonCreated());
    }
);

export const initFabricCanvas = createAsyncThunk(
    'canvas/initFabricCanvas',
    (options: IInitFabricCanvas, { dispatch }) => {
        const {reference, dispatch: remove_dispatch} = options;
        FCanvas.setReference(reference);
        FCanvas.setCustomControls(remove_dispatch);
        FCanvas.initialize();
        DesignManager.initializeDesignList();
        dispatch(fabricCanvasInitialized());
    }
);

export const canvas = createSlice({
    name: 'canvas',
    initialState: {
        isFabricSingletonCreated: false,
        isFabricCanvasReady: false
    },
    reducers: {
        //TODO: unused parameters
        fabricSingletonCreated: (state, action) => {
            state.isFabricSingletonCreated = true;
        },
        fabricCanvasInitialized: (state, action) => {
            state.isFabricCanvasReady = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFabricSingleton.fulfilled, (state, action) => {
                // Handle any specific logic if needed when the async operation is successful
                // console.log('createFabricSingleton.fulfilled');
            })
            .addCase(initFabricCanvas.fulfilled, (state, action) => {
                // Handle any specific logic if needed when the async operation is successful
                // console.log('initFabricCanvas.fulfilled');
            })
    }
});

export default canvas.reducer;
