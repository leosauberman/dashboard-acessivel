import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FiltroState {
    estado?: string[];
    ano?: number;
}

export const filtroSlice = createSlice({
    name: 'filtro',
    initialState: {} as FiltroState,
    reducers: {
        selecionarAno: (state, {payload}: PayloadAction<number | undefined>) => {
            state.ano = payload;
        },
        selecionarEstado: (state, {payload}: PayloadAction<string[] | undefined>) => {
            if(payload){
                state.estado = [...payload];
            }
            else state.estado = undefined;
        }
    },
});

export const { selecionarAno, selecionarEstado } = filtroSlice.actions;

export default filtroSlice.reducer;
