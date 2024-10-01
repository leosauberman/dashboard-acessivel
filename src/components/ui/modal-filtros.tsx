import {Dialog, DialogPanel, MultiSelect, MultiSelectItem, Select, SelectItem, Title} from "@tremor/react";
import {PropsWithChildren, useCallback} from "react";
import {X} from "lucide-react";
import {ESTADOS_UF} from "@/lib/estados-uf";
import {ANOS, REGIOES} from "@/lib/filtros";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selecionarAno, selecionarEstado } from "@/features/filtroSlice";

interface ModalFiltrosProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

export const ModalFiltros = ({isOpen, setIsOpen, children}: PropsWithChildren<ModalFiltrosProps>) => {
    const dispatch = useAppDispatch();
    const estado = useAppSelector((state) => state.filtro.estado);
    const ano = useAppSelector((state) => state.filtro.ano);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogPanel className="min-w-96 min-h-96">
                <div className="flex justify-between items-center">
                    <Title>Filtros</Title>
                    <button onClick={() => setIsOpen(false)}><X color="black" /></button>
                </div>
                <div className="flex flex-wrap gap-4">
                    {/*<div className="flex flex-col items-start gap-2 grow">
                        <label htmlFor="anos">Ano: </label>
                        <MultiSelect id="anos" value={ano} onValueChange={(value) => setAno(value)} placeholder="Selecionar Ano" className="w-full max-w-sm">
                            {
                                ANOS.map((value, i) => (
                                    <MultiSelectItem value={value.toString()} key={i}>{value}</MultiSelectItem>
                                ))
                            }
                        </MultiSelect>
                    </div>
                    <div className="basis-full h-0" />
                    <div className="flex flex-col items-start gap-2 grow">
                        <label htmlFor="regiao">Região: </label>
                        <MultiSelect id="regiao" value={regiao} onValueChange={(value) => setRegiao(value)} placeholder="Selecionar Região" className="w-full max-w-sm">
                            {
                                REGIOES.map((value, i) => (
                                    <MultiSelectItem value={value.toString()} key={i}>{value}</MultiSelectItem>
                                ))
                            }
                        </MultiSelect>
                    </div>*/}
                    <div className="flex flex-col items-start gap-2 grow">
                        <label htmlFor="anos">Ano: </label>
                        <Select 
                            id="anos" 
                            value={ano?.toString() ?? ""} 
                            onValueChange={(value) => dispatch(selecionarAno(parseInt(value)))} 
                            placeholder="Selecionar Ano" 
                            className="w-full max-w-sm"
                        >
                            {
                                ANOS.map((value, i) => (
                                    <SelectItem value={value.toString()} key={i}>{value}</SelectItem>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="basis-full h-0" />
                    <div className="flex flex-col items-start gap-2 grow">
                        <label htmlFor="estado">UF: </label>
                        <MultiSelect 
                            id="estado"
                            value={estado}
                            onValueChange={(value) => dispatch(selecionarEstado(value))} 
                            placeholder="Selecionar UF" 
                            className="w-full max-w-sm"
                        >
                            {
                                ESTADOS_UF.map(({label, value}, i) => (
                                    <MultiSelectItem value={value} key={i}>{label}</MultiSelectItem>
                                ))
                            }
                        </MultiSelect>
                    </div>
                    {children}
                </div>
            </DialogPanel>
        </Dialog>
    )
};

export default ModalFiltros;
