import {Button, Select, SelectItem, Text, Title,} from "@tremor/react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {BarChartHero} from "@/components/ui/bar-chart";
import {BaseIndicadorEnum, Indicador, indicadores} from "@/lib/indicadores";
import {EstiloGrafico, TipoVisualizacao} from "@/lib/utils";
import {TableA11y} from "@/components/ui/table";
import * as RadioButtonGroup from '@/components/ui/radio-button-group';
import {ValueChangeDetails} from "@zag-js/radio-group";
import {Spinner} from "@/components/ui/spinner/spinner";
import {Filter} from "lucide-react";
import ModalFiltros from "@/components/ui/modal-filtros";
import {AudioPlayer} from "@/components/ui/audio-player";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [baseIndicador, setBaseIndicador] = useState(BaseIndicadorEnum.SINASC);
    const indicadoresFiltrados = useMemo(() => indicadores.filter((i) => i.id.startsWith(baseIndicador)), [baseIndicador]);
    const [indicador, setIndicador] = useState<Indicador>(indicadoresFiltrados[0]);
    const [indicadorVar, setIndicadorVar] = useState(indicador.id);
    const [visualizacao, setVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Grafico);
    const [estiloGrafico, setEstiloGrafico] = useState<EstiloGrafico>(EstiloGrafico.Cores);
    const [estado, setEstado] = useState<string[]>([]);
    /*const [ano, setAno] = useState<string[]>([]);
    const [regiao, setRegiao] = useState<string[]>([]);*/
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tituloGrafico, setTituloGrafico] = useState("");
    const [filtros, setFiltros] = useState({});
    const [data, setData] = useState<[string, number][]>([]);
    const [tableColumns, setTableColumns] = useState<string[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [descricao, setDescricao] = useState("");
    const [audio, setAudio] = useState("");
    const [mostrarVisualizacao, setMostrarVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Nenhuma);
    const indicadorRef = useRef(null);
    const visualizacaoRef = useRef(null);
    const estiloRef = useRef(null);
    const indicadorChanged = useRef(true);
    const tiposVisualizacao: {value: TipoVisualizacao, label: string}[] = [{ value: TipoVisualizacao.Grafico, label: "Gráfico" }, { value: TipoVisualizacao.Tabela, label: "Tabela"}]
    const estilos: {value:EstiloGrafico, label: string}[] = [{ value: EstiloGrafico.Cores, label: "Cores" }, { value: EstiloGrafico.Padroes, label: "Padrões"}]

    const salvar = useCallback(() => {
        setIsModalOpen(false);
        if(baseIndicador === BaseIndicadorEnum.BPC) {
            setFiltros({ sigla_uf: estado });
        }
        else {
            setFiltros({ res_SIGLA_UF: estado });
        }
        indicadorChanged.current = true;
    }, [estado, baseIndicador])

    const aplicarSelecao = useCallback(async (indicadorSelecionado: Indicador) => {
        setIsLoading(true);
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
                    index: indicadorSelecionado.tabela,
                    columns: [...indicadorSelecionado.campo],
                    text: 1,
                    audio: 1,
                    filters: {
                        ...filtros
                        /*idade_obito_anos: [0],
                        res_SIGLA_UF: ['RJ'],*/
                    }
                }
            })
        }).then(async response => {
            setIsLoading(false);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const res = await response.json();

            const rows = res.rows;
            const cols = [indicador.eixo_x, "TOTAL"];
            const descricao = res.text_description;

            setData(rows);
            setTableColumns(cols);
            setColumns(res.columns);
            setDescricao(descricao);
            setAudio(res.audio);
        }).catch((err) => {
            console.log("ERRO: ", err);
            setIsLoading(false);
            if(confirm("Erro ao realizar a requisição. Recarregar a página?")){
                window.location.reload();
            }
        });
        console.log({filtros, indicador: indicadorVar, visualizacao});
        setMostrarVisualizacao(visualizacao);
    }, [filtros, indicadorVar, indicador, visualizacao]);

    const handleIndicador = useCallback((id: string) => {
        setIndicadorVar(id);
        indicadorChanged.current = true;
        const indicadorSelecionado = indicadoresFiltrados.find((i) => i.id === id);
        if(indicadorSelecionado) {
            setIndicador(indicadorSelecionado);
        }
    }, [indicadoresFiltrados]);

    const handleChangeBase = useCallback((value: string) => {
        setBaseIndicador(value as BaseIndicadorEnum);
    }, [])

    const handleChangeVisualizacao = useCallback(({value}: ValueChangeDetails) => {
        setVisualizacao(value as TipoVisualizacao);
        setMostrarVisualizacao(value as TipoVisualizacao);
    }, [])

    useEffect(() => {
        if(indicadorChanged.current){
            aplicarSelecao(indicador).then(() => {
                setTituloGrafico(indicador.nome);
                setMostrarVisualizacao(visualizacao);
                indicadorChanged.current = false;
            });
        }
    }, [aplicarSelecao, indicador, visualizacao, indicadorChanged])

    useEffect(() => {
        const indicadorHTML = indicadorRef.current as unknown as HTMLElement;
        const visualizacaoHTML = visualizacaoRef.current as unknown as HTMLElement;
        const estiloHTML = estiloRef.current as unknown as HTMLElement;
        if(indicadorHTML && visualizacaoHTML && estiloHTML) {
            //@ts-ignore
            indicadorHTML.querySelector('button').setAttribute('accessKey', 'i');
            const [grafico, tabela] = Array.from(visualizacaoHTML.querySelectorAll('input'));
            const [cores, padroes] = Array.from(estiloHTML.querySelectorAll('input'));
            grafico.setAttribute("accessKey", "g");
            tabela.setAttribute("accessKey", "t");
            cores.setAttribute("accessKey", "c");
            padroes.setAttribute("accessKey", "p");
        }
    }, [indicadorRef, visualizacaoRef, estiloRef])

    return (
        <>
            <div>
                <div>
                    <Title>SAÚDE - SISTEMA DE INFORMAÇÕES SOBRE NASCIDOS VIVOS - SINASC</Title>
                    <Text>ANÔMALIAS CONGÊNITAS</Text>
                </div>
                <Text>SISDEF</Text>
            </div>
            <div className="flex gap-3 m-3 items-end">
                <div>
                    <span className="text-xs text-tremor-content-emphasis">Base: </span>
                    <Select value={baseIndicador} onValueChange={handleChangeBase} placeholder="Selecionar Base" ref={indicadorRef} enableClear={false} className="max-w-xs">
                        {
                            Object.entries(BaseIndicadorEnum).map(([key, val], index) => (
                                <SelectItem value={val} key={index}>{key}</SelectItem>
                            ))
                        }
                    </Select>
                </div>

                <div>
                    <span className="text-xs text-tremor-content-emphasis">Indicador: </span>
                    <Select value={indicadorVar} onValueChange={handleIndicador} placeholder="Selecionar Indicador" ref={indicadorRef} enableClear={false} className="max-w-2xl min-w-[32rem]">
                        {
                            indicadoresFiltrados.map(({id, nome}, index) => (
                                <SelectItem value={id} key={index}>{nome}</SelectItem>
                            ))
                        }
                    </Select>
                </div>

                <div>
                    <span className="text-xs text-tremor-content-emphasis">Tipo de Visualização: </span>
                    <RadioButtonGroup.Root value={visualizacao} className="max-w-48 w-full gap-2" onValueChange={handleChangeVisualizacao} ref={visualizacaoRef}>
                        {tiposVisualizacao.map((option, id) => (
                            <RadioButtonGroup.Item
                                key={id} value={option.value}
                                className="group data-checked:bg-nippis-brand-1 data-checked:border-nippis-brand-1
                                        data-checked:hover:bg-nippis-brand-2 data-checked:hover:border-nippis-brand-2
                                        data-[focus]:ring-2 focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
                                >
                                <RadioButtonGroup.ItemControl />
                                <RadioButtonGroup.ItemText>{option.label}</RadioButtonGroup.ItemText>
                            </RadioButtonGroup.Item>
                        ))}
                    </RadioButtonGroup.Root>
                </div>
                <div>
                    <span className="text-xs text-tremor-content-emphasis">Habilitar/Desabilitar padrões: </span>
                    <RadioButtonGroup.Root value={estiloGrafico} className="max-w-48 w-full gap-2" onValueChange={({value}) => setEstiloGrafico(value as EstiloGrafico)} ref={estiloRef}>
                        {estilos.map((option, id) => (
                            <RadioButtonGroup.Item
                                key={id} value={option.value}
                                className="group data-checked:bg-nippis-brand-1 data-checked:border-nippis-brand-1
                                        data-checked:hover:bg-nippis-brand-2 data-checked:hover:border-nippis-brand-2
                                        data-[focus]:ring-2 focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted">
                                <RadioButtonGroup.ItemControl />
                                <RadioButtonGroup.ItemText>{option.label}</RadioButtonGroup.ItemText>
                            </RadioButtonGroup.Item>
                        ))}
                    </RadioButtonGroup.Root>
                </div>
                <div className="flex flex-col gap-1 items-center justify-between">
                    <span className="text-xs text-tremor-content-emphasis">Filtros: </span>
                    <button onClick={() => setIsModalOpen(true)}>
                        <Filter size={36} color="#054e7a" />
                    </button>
                </div>
                <ModalFiltros isOpen={isModalOpen} setIsOpen={setIsModalOpen} estado={estado} setEstado={setEstado}>
                    <div className="flex justify-end w-full">
                        <Button className="focus:bg-tremor-brand-emphasis" onClick={() => salvar()}>Salvar</Button>
                    </div>
                </ModalFiltros>
            </div>
            <div aria-relevant="additions removals" aria-live="polite">
            {
                isLoading
                    ? (
                        <div className="flex h-40 w-full items-center justify-center">
                            <Spinner />
                        </div>
                    )
                    : (<figure className="flex flex-col mt-10 items-center justify-center w-full">
                        <div className="w-1/2">
                            {
                                mostrarVisualizacao === TipoVisualizacao.Grafico && <BarChartHero data={data} columns={columns} title={tituloGrafico} xAxisLabel={indicador.eixo_x} estiloGrafico={estiloGrafico} />
                            }
                            {
                                mostrarVisualizacao === TipoVisualizacao.Tabela && <TableA11y data={data} columns={tableColumns} title={tituloGrafico} />
                            }
                        </div>
                        <div className="">
                            <AudioPlayer audioBase64={audio} />
                            <p className="highcharts-description flex mt-10 items-center justify-center w-full">{descricao}</p>
                        </div>
                    </figure>)
            }
            </div>
        </>
    );
}
