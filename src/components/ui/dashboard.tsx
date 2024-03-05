import {Select, SelectItem, Text, Title,} from "@tremor/react";
import {useCallback, useEffect, useRef, useState} from "react";
import {BarChartHero} from "@/components/ui/bar-chart";
import {Indicador, indicadores} from "@/lib/indicadores";
import {EstiloGrafico, TipoVisualizacao} from "@/lib/utils";
import {TableA11y} from "@/components/ui/table";
import * as RadioButtonGroup from '@/components/ui/radio-button-group';
import {ValueChangeDetails} from "@zag-js/radio-group";

export default function Dashboard() {
    const [indicador, setIndicador] = useState<Indicador>(indicadores[0]);
    const [indicadorVar, setIndicadorVar] = useState(indicador.campo);
    const [visualizacao, setVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Grafico);
    const [estiloGrafico, setEstiloGrafico] = useState<EstiloGrafico>(EstiloGrafico.Cores);
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
    const indicadorRef = useRef(null);
    const visualizacaoRef = useRef(null);
    const estiloRef = useRef(null);
    const indicadorChanged = useRef(true);
    const tiposVisualizacao: {value: TipoVisualizacao, label: string}[] = [{ value: TipoVisualizacao.Grafico, label: "Gráfico" }, { value: TipoVisualizacao.Tabela, label: "Tabela"}]
    const estilos: {value:EstiloGrafico, label: string}[] = [{ value: EstiloGrafico.Cores, label: "Cores" }, { value: EstiloGrafico.Padroes, label: "Padrões"}]

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
        indicadorChanged.current = true;
        const indicadorSelecionado = indicadores.find((i) => i.campo === campo);
        if(indicadorSelecionado) {
            setIndicador(indicadorSelecionado);
        }
    }, []);

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
            <div className="flex gap-3 m-3">
                <Select value={indicadorVar} onValueChange={handleIndicador} placeholder="Selecionar Indicador" ref={indicadorRef} enableClear={false}>
                    {
                        indicadores.map(({campo, nome}, index) => (
                            <SelectItem value={campo} key={index}>{nome}</SelectItem>
                        ))
                    }
                </Select>

                <RadioButtonGroup.Root value={visualizacao} className="max-w-48 w-full" onValueChange={handleChangeVisualizacao} ref={visualizacaoRef}>
                    {tiposVisualizacao.map((option, id) => (
                        <RadioButtonGroup.Item key={id} value={option.value}>
                            <RadioButtonGroup.ItemControl />
                            <RadioButtonGroup.ItemText>{option.label}</RadioButtonGroup.ItemText>
                        </RadioButtonGroup.Item>
                    ))}
                </RadioButtonGroup.Root>

                <RadioButtonGroup.Root value={estiloGrafico} className="max-w-48 w-full" onValueChange={({value}) => setEstiloGrafico(value as EstiloGrafico)} ref={estiloRef}>
                    {estilos.map((option, id) => (
                        <RadioButtonGroup.Item key={id} value={option.value}>
                            <RadioButtonGroup.ItemControl />
                            <RadioButtonGroup.ItemText>{option.label}</RadioButtonGroup.ItemText>
                        </RadioButtonGroup.Item>
                    ))}
                </RadioButtonGroup.Root>

                {/*<Button className="focus:bg-tremor-brand-emphasis" onClick={() => setIsModalOpen(true)}>Selecionar Filtros</Button>
                <ModalFiltros isOpen={isModalOpen} setIsOpen={setIsModalOpen} estado={estado} setEstado={setEstado} ano={ano} setAno={setAno} regiao={regiao} setRegiao={setRegiao}>
                    <div className="flex justify-end w-full">
                        <Button className="focus:bg-tremor-brand-emphasis" onClick={() => salvar()}>Salvar</Button>
                    </div>
                </ModalFiltros>*/}
                {/*<Button className="focus:bg-tremor-brand-emphasis" onClick={() => aplicarSelecao()}>Aplicar Seleções</Button>*/}
            </div>
            <figure className="flex flex-col mt-10 items-center justify-center w-full">
                <div className="w-1/2">
                    {
                        mostrarVisualizacao === TipoVisualizacao.Grafico && <BarChartHero data={data} title={tituloGrafico} xAxisLabel={indicador.eixo_x} estiloGrafico={estiloGrafico} />
                    }
                    {
                        mostrarVisualizacao === TipoVisualizacao.Tabela && <TableA11y data={data} columns={columns} title={tituloGrafico} />
                    }
                </div>
                <p className="highcharts-description flex mt-10 items-center justify-center w-full">{descricao}</p>
            </figure>
        </>
    );
}
