import {Select, SelectItem, Text, Title,} from "@tremor/react";
import {useCallback, useEffect, useState} from "react";
import {BarChartHero} from "@/components/ui/bar-chart";
import {Indicador, indicadores} from "@/lib/indicadores";
import {TipoVisualizacao} from "@/lib/utils";
import {TableA11y} from "@/components/ui/table";

export default function Dashboard() {
    const [indicador, setIndicador] = useState<Indicador>(indicadores[0]);
    const [indicadorVar, setIndicadorVar] = useState(indicador.campo);
    const [visualizacao, setVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Grafico);
    /*const [estado, setEstado] = useState<string[]>([]);
    const [ano, setAno] = useState<string[]>([]);
    const [regiao, setRegiao] = useState<string[]>([]);*/
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [tituloGrafico, setTituloGrafico] = useState("");
    const [filtros, setFiltros] = useState({});
    const [data, setData] = useState<[string, number][]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [descricao, setDescricao] = useState("");
    const [mostrarVisualizacao, setMostrarVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Nenhuma);

    /*const salvar = useCallback(() => {
        setIsModalOpen(false);
        // setFiltros({ estado, ano, regiao});
    }, [estado, ano, regiao])*/

    const aplicarSelecao = useCallback(async (indicadorSelecionado: Indicador) => {
        fetch('https://bigdata-api.fiocruz.br/json_query', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: {
                    token: process.env.NEXT_PUBLIC_TOKEN
                },
                query: {
                    index: 'datasus-sinasc',
                    columns: [indicadorSelecionado.campo],
                    text: 1,
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

            const rows = res.rows;
            const cols = [res.columns.map((c: { name: string, type: string}) => c.name)[0], "TOTAL"];
            const descricao = res.text_description;

            setData(rows);
            setColumns(cols);
            setDescricao(descricao);
        })
        console.log({filtros, indicador: indicadorVar, visualizacao});
        setMostrarVisualizacao(visualizacao);
    }, [filtros, indicadorVar, visualizacao]);

    const handleIndicador = useCallback((campo: string) => {
        setIndicadorVar(campo);
        const indicadorSelecionado = indicadores.find((i) => i.campo === campo);
        if(indicadorSelecionado) {
            setIndicador(indicadorSelecionado);
            setTituloGrafico(indicadorSelecionado.nome);
            // aplicarSelecao(indicadorSelecionado);
        }
    }, []);

    const handleChangeVisualizacao = useCallback((value: string) => {
        setVisualizacao(value as TipoVisualizacao);
        setMostrarVisualizacao(value as TipoVisualizacao);
    }, [])

    useEffect(() => {
        aplicarSelecao(indicador).then(() => setMostrarVisualizacao(TipoVisualizacao.Grafico));
    }, [aplicarSelecao, indicador])

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
                <Select value={indicadorVar} onValueChange={handleIndicador} placeholder="Selecionar Indicador" accessKey="i" enableClear={false}>
                    {
                        indicadores.map(({campo, nome}, index) => (
                            <SelectItem value={campo} key={index}>{nome}</SelectItem>
                        ))
                    }
                </Select>
                <Select
                    value={visualizacao}
                    onValueChange={handleChangeVisualizacao}
                    placeholder="Selecionar Tipo de Visualização"
                    className="max-w-72"
                    enableClear={false}
                >
                    <SelectItem value={TipoVisualizacao.Tabela}>Tabela</SelectItem>
                    <SelectItem value={TipoVisualizacao.Grafico}>Gráfico</SelectItem>
                </Select>
                {/*<Button className="focus:bg-tremor-brand-emphasis" onClick={() => setIsModalOpen(true)}>Selecionar Filtros</Button>
                <ModalFiltros isOpen={isModalOpen} setIsOpen={setIsModalOpen} estado={estado} setEstado={setEstado} ano={ano} setAno={setAno} regiao={regiao} setRegiao={setRegiao}>
                    <div className="flex justify-end w-full">
                        <Button className="focus:bg-tremor-brand-emphasis" onClick={() => salvar()}>Salvar</Button>
                    </div>
                </ModalFiltros>*/}
                {/*<Button className="focus:bg-tremor-brand-emphasis" onClick={() => aplicarSelecao()}>Aplicar Seleções</Button>*/}
            </div>
            <div className="flex mt-10 items-center justify-center w-full">
                <div className="w-1/2">
                    {
                        mostrarVisualizacao === TipoVisualizacao.Grafico && <BarChartHero data={data} title={tituloGrafico} xAxisLabel={indicador?.campo ?? "eixo x"} />
                    }
                    {
                        mostrarVisualizacao === TipoVisualizacao.Tabela && <TableA11y data={data} columns={columns} title={tituloGrafico} />
                    }
                </div>
            </div>
            <div className="flex mt-10 items-center justify-center w-full">
                <p>{descricao}</p>
            </div>
        </>
    );
}
