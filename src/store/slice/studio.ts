import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Studio} from "@/models/babylon/Studio";
import {StudioManager} from "@/models/babylon/StudioManager";
import {BEngine} from "@/models/babylon/BEngine";

export const studioSingletonCreated = createAction('studio/studioSingletonCreated');
export const babylonInitialized = createAction('studio/babylonInitialized');
export const babylonDestroyed = createAction('studio/babylonDestroyed');

export const createStudioSingleton = createAsyncThunk(
    'studio/createStudioSingleton',
    (studio: Studio, { dispatch }) => {
        StudioManager.createStudioSingleton(studio);
        dispatch(studioSingletonCreated());
    }
);

export const createBabylon = createAsyncThunk(
    'studio/createBabylon',
    (canvas: HTMLCanvasElement, { dispatch }) => {
        BEngine.initialize(canvas);
        StudioManager.babylonFactory();
        dispatch(babylonInitialized());
    }
);

export const destroyBabylon = createAsyncThunk(
    'studio/destroyBabylon',
    (_, { dispatch }) => {
        StudioManager.babylonDestroy();
        dispatch(babylonDestroyed());
    }
);

export const studio = createSlice({
    name: 'studio',
    initialState: {
        isStudioModelReady: false,
        isBabylonReady: false,
    },
    reducers: {
        //TODO: unused parameters
        studioSingletonCreated: (state, action) => {
            state.isStudioModelReady = true;
        },
        babylonInitialized: (state, action) => {
            state.isBabylonReady = true;
        },
        babylonDestroyed: (state, action) => {
            state.isBabylonReady = false;
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(createStudioSingleton.fulfilled, (state, action) => {
            // Handle any specific logic if needed when the async operation is successful
            console.log('createStudioSingleton.fulfilled');
        })
        .addCase(createBabylon.fulfilled, (state, action) => {
            // Handle any specific logic if needed when the async operation is successful
            console.log('createBabylon.fulfilled');
        })
        .addCase(destroyBabylon.fulfilled, (state, action) => {
            // Handle any specific logic if needed when the async operation is successful
            console.log('destroyBabylon.fulfilled');
        })
}
});

export default studio.reducer;
