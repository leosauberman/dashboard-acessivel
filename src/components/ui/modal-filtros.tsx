import {Dialog, DialogPanel, MultiSelect, MultiSelectItem, Title} from "@tremor/react";
import {PropsWithChildren} from "react";
import {X} from "lucide-react";
import {ESTADOS_UF} from "@/lib/estados-uf";
import {ANOS, REGIOES} from "@/lib/filtros";

interface ModalFiltrosProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    estado: string[],
    setEstado: (val: string[]) => void;
}

export const ModalFiltros = ({isOpen, setIsOpen, children, estado, setEstado}: PropsWithChildren<ModalFiltrosProps>) => (
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
                <div className="basis-full h-0" />
                <div className="flex flex-col items-start gap-2 grow">
                    <label htmlFor="estado">UF: </label>
                    <MultiSelect id="estado" value={estado} onValueChange={(value) => setEstado(value)} placeholder="Selecionar UF" className="w-full max-w-sm">
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
);

export default ModalFiltros;
