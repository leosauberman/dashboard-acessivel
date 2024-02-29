import {Button, MultiSelect, MultiSelectItem, Select, SelectItem, Text, Title,} from "@tremor/react";
import {useCallback, useState} from "react";
import ModalFiltros from "@/components/ui/modal-filtros";
import {ESTADOS_UF} from "@/lib/estados-uf";
import {BarChartHero} from "@/components/ui/bar-chart";
import {Indicador, indicadores} from "@/lib/indicadores";
import {TipoVisualizacao} from "@/lib/utils";
import {TableA11y} from "@/components/ui/table";

export default function Dashboard() {
    const [indicadorVar, setIndicadorVar] = useState("");
    const [indicador, setIndicador] = useState<Indicador>();
    const [visualizacao, setVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Nenhuma);
    const [estado, setEstado] = useState<string[]>([]);
    const [abrangencia, setAbrangencia] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filtros, setFiltros] = useState({});
    const [data, setData] = useState<{ [key: string]: number[] }>({});
    const [columns, setColumns] = useState<string[]>([]);
    const [mostrarVisualizacao, setMostrarVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Nenhuma);

    const handleIndicador = useCallback((campo: string) => {
        setIndicadorVar(campo);
        const indicador = indicadores.find((i) => i.campo === campo);
        if(indicador) {
            setIndicador(indicador);
        }
    }, [setIndicador, setIndicadorVar]);

    const salvar = useCallback(() => {
        setIsModalOpen(false);
        setFiltros({ estado, abrangencia})
    }, [setIsModalOpen, estado, abrangencia, setFiltros])

    const aplicarSelecao = useCallback(async () => {
        fetch('https://bigdata-api.fiocruz.br/json_query', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: {
                    token: process.env.TOKEN
                },
                query: {
                    index: 'datasus-sinasc',
                    columns: [indicadorVar],
                    filters: {
                        /*idade_obito_anos: [0],
                        res_SIGLA_UF: ['RJ'],*/
                    }
                }
            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const res = await response.json();

            const arrays: { [key: string]: number[] } = {};
            res.rows.forEach((row: [string, number]) => {
                const [label, count] = row;
                if (!arrays[label]) {
                    arrays[label] = [];
                }
                arrays[label].push(count);
            });

            const cols = res.columns.map((c: { name: string, type: string}) => c.name);

            setData(arrays);
            setColumns(cols);
        })
        console.log({filtros, indicador: indicadorVar, visualizacao});
        setMostrarVisualizacao(visualizacao);
    }, [filtros, indicadorVar, visualizacao, setMostrarVisualizacao, setData, setColumns]);

    return (
        <>
            <div>
                <div>
                    <Title>SAÚDE - SISTEMA DE INFORMAÇÕES SOBRE NASCIDOS VIVOS - SINASC</Title>
                    <Text>ANÔMALIAS CONGÊNITAS</Text>
                </div>
                <Text>SISDEF</Text>
            </div>
            <div className="flex gap-3 m-3">
                <Select value={indicadorVar} onValueChange={handleIndicador} placeholder="Selecionar Indicador" accessKey="i">
                    {
                        indicadores.map(({campo, nome}, index) => (
                            <SelectItem value={campo} key={index}>{nome}</SelectItem>
                        ))
                    }
                </Select>
                <Select
                    value={visualizacao}
                    onValueChange={(value) => setVisualizacao(value as TipoVisualizacao)}
                    placeholder="Selecionar Tipo de Visualização"
                    className="max-w-72"
                >
                    <SelectItem value={TipoVisualizacao.Textual}>Descrição Textual</SelectItem>
                    <SelectItem value={TipoVisualizacao.Tabela}>Tabela</SelectItem>
                    <SelectItem value={TipoVisualizacao.Grafico}>Gráfico</SelectItem>
                </Select>
                <Button className="focus:bg-tremor-brand-emphasis" onClick={() => setIsModalOpen(true)}>Selecionar Filtros</Button>
                <ModalFiltros isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                    <div className="flex flex-col items-start gap-2 grow">
                        <label htmlFor="estado">UF: </label>
                        <MultiSelect id="estado" value={estado} onValueChange={setEstado} placeholder="Selecionar UF" className="w-full max-w-sm">
                            {
                                ESTADOS_UF.map(({label, value}, i) => (
                                    <MultiSelectItem value={value} key={i}>{label}</MultiSelectItem>
                                ))
                            }
                        </MultiSelect>
                    </div>
                    <div className="basis-full h-0" />
                    <div className="flex flex-col items-start gap-2 grow">
                        <label htmlFor="abrangencia">Abrangência: </label>
                        <Select id="abrangencia" value={abrangencia} onValueChange={setAbrangencia} placeholder="Selecionar Abrangencia" className="w-full max-w-sm">
                            {
                                [
                                    {
                                        label: "Total",
                                        value: "0"
                                    },
                                    {
                                        label: "Grandes Regiões",
                                        value: "1"
                                    },
                                    {
                                        label: "Unidades da Federação",
                                        value: "2"
                                    },
                                    {
                                        label: "Capitais",
                                        value: "3"
                                    },
                                    {
                                        label: "Situação urbano/rural",
                                        value: "4"
                                    },
                                    {
                                        label: "Sexo",
                                        value: "5"
                                    },
                                    {
                                        label: "Faixa de idade (18 anos ou mais)",
                                        value: "6"
                                    },
                                    {
                                        label: "Raça/Cor",
                                        value: "7"
                                    },
                                    {
                                        label: "Escolaridade",
                                        value: "8"
                                    },
                                    {
                                        label: "Rendimento domiciliar per capita",
                                        value: "9"
                                    }
                                ].map(({label, value}, i) => (
                                    <SelectItem value={value} key={i}>{label}</SelectItem>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="basis-full h-0" />
                    <div className="flex justify-end w-full">
                        <Button className="focus:bg-tremor-brand-emphasis" onClick={() => salvar()}>Salvar</Button>
                    </div>
                </ModalFiltros>
                <Button className="focus:bg-tremor-brand-emphasis" onClick={() => aplicarSelecao()}>Aplicar Seleções</Button>
            </div>
            <div className="flex mt-10 items-center justify-center w-full">
                <div className="w-1/2">
                    {
                        mostrarVisualizacao === TipoVisualizacao.Grafico && <BarChartHero data={data} title={indicador?.nome ?? "Indicador"} xAxisLabel={indicador?.campo ?? "eixo x"} />
                    }
                    {
                        mostrarVisualizacao === TipoVisualizacao.Tabela && <TableA11y data={data} columns={columns} title={indicador?.nome ?? "Indicador"} />
                    }
                </div>
            </div>
        </>
    );
}
