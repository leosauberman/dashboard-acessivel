import {Dialog, DialogPanel, Title} from "@tremor/react";
import {PropsWithChildren} from "react";
import {X} from "lucide-react";

interface ModalFiltrosProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

export const ModalFiltros = ({isOpen, setIsOpen, children}: PropsWithChildren<ModalFiltrosProps>) => (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogPanel className="min-w-96 min-h-96">
            <div className="flex justify-between items-center">
                <Title>Filtros</Title>
                <button onClick={() => setIsOpen(false)}><X color="black" /></button>
            </div>
            <div className="flex flex-wrap gap-4">
                {children}
            </div>
        </DialogPanel>
    </Dialog>
);

export default ModalFiltros;
