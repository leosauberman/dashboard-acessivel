import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseIndicadorEnum, Indicador, indicadores} from "@/lib/indicadores";

interface IndicadorState {
    base: BaseIndicadorEnum,
    indicadores: Indicador[],
    valor: Indicador,
    id: Indicador["id"]
}

const getInitialState = (): IndicadorState => {
    const initial = { base: BaseIndicadorEnum.SINASC };
    const indicadoresFiltrados = indicadores.filter((i) => i.id.startsWith(initial.base));
    const valor = indicadoresFiltrados[0];

    return {
        ...initial,
        indicadores: indicadoresFiltrados,
        valor,
        id: valor.id
    } as IndicadorState
}

export const indicadorSlice = createSlice({
    name: 'indicador',
    initialState: getInitialState(),
    reducers: {
        selecionar: (state, action: PayloadAction<string>) => {
            const valor = state.indicadores.find((i) => i.id === action.payload);
            if(valor) {
                state.id = action.payload;
                state.valor = valor;
            }
        },
        alterarBase: (state, action: PayloadAction<BaseIndicadorEnum>) => {
            state.base = action.payload;
            state.indicadores = indicadores.filter((i) => i.id.startsWith(action.payload))
        }
    },
});

export const { selecionar, alterarBase } = indicadorSlice.actions;

export default indicadorSlice.reducer;
