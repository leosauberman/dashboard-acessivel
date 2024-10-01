import { configureStore } from '@reduxjs/toolkit';
import indicadorReducer from "@/features/indicadorSlice"
import {useDispatch, useSelector, useStore} from "react-redux";
import filtroReducer from '@/features/filtroSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            indicador: indicadorReducer,
            filtro: filtroReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
