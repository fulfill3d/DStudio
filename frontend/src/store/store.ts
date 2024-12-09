import { configureStore } from '@reduxjs/toolkit';
import studioReducer from './slice/studio';
import canvasReducer from './slice/canvas';
import designReducer from "./slice/design";

export const store = configureStore({
    reducer: {
        studio: studioReducer,
        canvas: canvasReducer,
        design: designReducer
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
