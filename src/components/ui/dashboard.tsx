import { Button, Select, SelectItem, Text, Title } from "@tremor/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BarChartHero } from "@/components/ui/bar-chart";
import { BaseIndicadorEnum, Indicador, indicadores } from "@/lib/indicadores";
import { EstiloGrafico, TipoVisualizacao } from "@/lib/utils";
import { TableA11y } from "@/components/ui/table";
import * as RadioButtonGroup from "@/components/ui/radio-button-group";
import { ValueChangeDetails } from "@zag-js/radio-group";
import { Spinner } from "@/components/ui/spinner/spinner";
import { Filter } from "lucide-react";
import ModalFiltros from "@/components/ui/modal-filtros";
import { AudioPlayer } from "@/components/ui/audio-player";
import { alterarBase, selecionar } from "@/features/indicadorSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

type ToggleButtonOptions<T> = { value: T; label: string }[]

const TIPOS_VISUALIZACAO: ToggleButtonOptions<TipoVisualizacao> = [
  { value: TipoVisualizacao.Grafico, label: "Gráfico" },
  { value: TipoVisualizacao.Tabela, label: "Tabela" },
];
const ESTILOS: ToggleButtonOptions<EstiloGrafico> = [
  { value: EstiloGrafico.Cores, label: "Cores" },
  { value: EstiloGrafico.Padroes, label: "Padrões" },
];

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const {
    base: baseIndicador,
    indicadores: indicadoresFiltrados,
    valor: indicador,
    id: indicadorID,
  } = useAppSelector((state) => state.indicador);
  const { estado, ano } = useAppSelector((state) => state.filtro);

  const [isLoading, setIsLoading] = useState(false);
  const [visualizacao, setVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Grafico);
  const [estiloGrafico, setEstiloGrafico] = useState<EstiloGrafico>(EstiloGrafico.Cores);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tituloGrafico, setTituloGrafico] = useState("");
  const [filtros, setFiltros] = useState({});
  const [data, setData] = useState<[string, number[]][]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [tableColumns, setTableColumns] = useState<string[]>([]);
  const [totalRegistros, setTotalRegistros] = useState<number>(0);
  const [columns, setColumns] = useState<string[]>([]);
  const [descricao, setDescricao] = useState("");
  const [audio, setAudio] = useState("");
  const [mostrarVisualizacao, setMostrarVisualizacao] = useState<TipoVisualizacao>(TipoVisualizacao.Nenhuma);
  const [isAudioRequested, setIsAudioRequested] = useState<boolean>(false);

  const indicadorRef = useRef(null);
  const visualizacaoRef = useRef(null);
  const estiloRef = useRef(null);
  const indicadorChanged = useRef(true);

  const salvar = useCallback(() => {
    setIsModalOpen(false);
    if (estado || ano) {
      const baseFiltros = { ano_nasc: [ano] };
      const estadoFiltro = estado && estado.length > 0 ? estado : undefined;
      if (baseIndicador === BaseIndicadorEnum.BPC) {
        setFiltros({ ...baseFiltros, sigla_uf: estadoFiltro });
      } else {
        setFiltros({ ...baseFiltros, res_SIGLA_UF: estadoFiltro });
      }
    }
    indicadorChanged.current = true;
  }, [estado, baseIndicador, ano]);

  const aplicarSelecao = useCallback(
    async (indicadorSelecionado: Indicador) => {
      setIsLoading(true);
      const filters = indicadorSelecionado?.filtros.reduce(
        (prev, curr) => ({ ...prev, ...curr }),
        { ...filtros }
      );

      fetch("https://bigdata-api.fiocruz.br/json_query", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: {
            token: process.env.NEXT_PUBLIC_TOKEN,
          },
          query: {
            index: indicadorSelecionado?.tabela,
            columns: [
              ...(indicadorSelecionado?.campo
                ? indicadorSelecionado.campo
                : []),
            ],
            audio: 0,
            text: 1,
            filters,
          },
        }),
      })
        .then(async (response) => {
          setIsLoading(false);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const res = await response.json();

          const descricao = res.text_description;

          let rows: Array<[string, number[]]>;
          let eixoX: string[];
          let cols: string[];

          if (res.columns.length > 2) {
            let filteredRows: [string, number][] = res.rows.map((r: any[]) =>
              r.slice(1)
            );
            const tempHashMap = new Map<string, number[]>();
            filteredRows.forEach(([k, v]) => {
              if (!tempHashMap.has(k)) tempHashMap.set(k, []);
              tempHashMap.get(k)!.push(v);
            });
            rows = Array.from(tempHashMap.entries());
            eixoX = Array.from(new Set(res.rows.map((r: any[]) => r[0])));
            cols = [...eixoX, "TOTAL"];
          } else {
            rows = res.rows; //tratar pra ser [value]
            eixoX = [indicador.eixo_x];
            cols = [...eixoX, "TOTAL"];
          }

          setData(rows);
          setXAxis(eixoX);
          setTableColumns(cols);
          setColumns(res.columns);
          setDescricao(descricao);
          setTotalRegistros(res.total);
          setIsAudioRequested(false);
        })
        .catch((err) => {
          console.log("ERRO: ", err);
          setIsLoading(false);
          // if(confirm("Erro ao realizar a requisição. Recarregar a página?")){
          //     window.location.reload();
          // }
        });
      console.log({ filters, indicador: indicadorID, visualizacao });
      setMostrarVisualizacao(visualizacao);
    },
    [filtros, indicadorID, indicador, visualizacao]
  );

  const handleIndicador = useCallback(
    (id: string) => {
      dispatch(selecionar(id));
      indicadorChanged.current = true;
    },
    [dispatch]
  );

  const handleChangeBase = useCallback(
    (value: string) => {
      dispatch(alterarBase(value as BaseIndicadorEnum));
    },
    [dispatch]
  );

  const handleChangeVisualizacao = useCallback(
    ({ value }: ValueChangeDetails) => {
      setVisualizacao(value as TipoVisualizacao);
      setMostrarVisualizacao(value as TipoVisualizacao);
    },
    []
  );

  useEffect(() => {
    if (indicadorChanged.current) {
      aplicarSelecao(indicador).then(() => {
        setTituloGrafico(indicador.nome);
        setMostrarVisualizacao(visualizacao);
        indicadorChanged.current = false;
      });
    }
  }, [aplicarSelecao, indicador, visualizacao, indicadorChanged]);

  useEffect(() => {
    const indicadorHTML = indicadorRef.current as unknown as HTMLElement;
    const visualizacaoHTML = visualizacaoRef.current as unknown as HTMLElement;
    const estiloHTML = estiloRef.current as unknown as HTMLElement;
    if (indicadorHTML && visualizacaoHTML && estiloHTML) {
      //@ts-ignore
      indicadorHTML.querySelector("button").setAttribute("accessKey", "i");
      const [grafico, tabela] = Array.from(
        visualizacaoHTML.querySelectorAll("input")
      );
      const [cores, padroes] = Array.from(estiloHTML.querySelectorAll("input"));
      grafico.setAttribute("accessKey", "g");
      tabela.setAttribute("accessKey", "t");
      cores.setAttribute("accessKey", "c");
      padroes.setAttribute("accessKey", "p");
    }
  }, [indicadorRef, visualizacaoRef, estiloRef]);

  useEffect(() => {
    if(isAudioRequested) {
        fetch("https://bigdata-api.fiocruz.br/audio_description", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: {
                token: process.env.NEXT_PUBLIC_TOKEN,
              },
              data: {
                text: descricao
              },
            }),
          })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const res: {audio_description: string} = await response.json();
            setAudio(res.audio_description);
        });
    }
  }, [isAudioRequested, descricao])

  return (
    <>
      <div>
        <div>
          <Title>
            SAÚDE - SISTEMA DE INFORMAÇÕES SOBRE NASCIDOS VIVOS - SINASC
          </Title>
          <Text>ANÔMALIAS CONGÊNITAS</Text>
        </div>
        <Text>SISDEF</Text>
      </div>
      <div className="flex flex-wrap gap-3 m-3 items-end">
        <div>
          <span className="text-xs text-tremor-content-emphasis">Base: </span>
          <Select
            value={baseIndicador}
            onValueChange={handleChangeBase}
            placeholder="Selecionar Base"
            ref={indicadorRef}
            enableClear={false}
            className="max-w-xs"
          >
            {Object.entries(BaseIndicadorEnum).map(([key, val], index) => (
              <SelectItem value={val} key={index}>
                {key}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <span className="text-xs text-tremor-content-emphasis">
            Indicador:{" "}
          </span>
          <Select
            value={indicadorID}
            title={indicador?.nome}
            onValueChange={handleIndicador}
            placeholder="Selecionar Indicador"
            ref={indicadorRef}
            enableClear={false}
            className="w-[46rem]"
          >
            {indicadoresFiltrados?.map(({ id, nome }, index) => (
              <SelectItem value={id} key={index}>
                {nome}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <span className="text-xs text-tremor-content-emphasis">
            Tipo de Visualização:{" "}
          </span>
          <RadioButtonGroup.Root
            value={visualizacao}
            className="max-w-48 w-full gap-2"
            onValueChange={handleChangeVisualizacao}
            ref={visualizacaoRef}
          >
            {TIPOS_VISUALIZACAO.map((option, id) => (
              <RadioButtonGroup.Item
                key={id}
                value={option.value}
                className="group data-checked:bg-nippis-brand-1 data-checked:border-nippis-brand-1
                                        data-checked:hover:bg-nippis-brand-2 data-checked:hover:border-nippis-brand-2
                                        data-[focus]:ring-2 focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
              >
                <RadioButtonGroup.ItemControl />
                <RadioButtonGroup.ItemText>
                  {option.label}
                </RadioButtonGroup.ItemText>
              </RadioButtonGroup.Item>
            ))}
          </RadioButtonGroup.Root>
        </div>
        <div>
          <span className="text-xs text-tremor-content-emphasis">
            Habilitar/Desabilitar padrões:{" "}
          </span>
          <RadioButtonGroup.Root
            value={estiloGrafico}
            className="max-w-48 w-full gap-2"
            onValueChange={({ value }) =>
              setEstiloGrafico(value as EstiloGrafico)
            }
            ref={estiloRef}
          >
            {ESTILOS.map((option, id) => (
              <RadioButtonGroup.Item
                key={id}
                value={option.value}
                className="group data-checked:bg-nippis-brand-1 data-checked:border-nippis-brand-1
                                        data-checked:hover:bg-nippis-brand-2 data-checked:hover:border-nippis-brand-2
                                        data-[focus]:ring-2 focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted"
              >
                <RadioButtonGroup.ItemControl />
                <RadioButtonGroup.ItemText>
                  {option.label}
                </RadioButtonGroup.ItemText>
              </RadioButtonGroup.Item>
            ))}
          </RadioButtonGroup.Root>
        </div>
        <div className="flex flex-col gap-1 items-center justify-between">
          <span className="text-xs text-tremor-content-emphasis">
            Filtros:{" "}
          </span>
          <button onClick={() => setIsModalOpen(true)}>
            <Filter size={36} color="#054e7a" />
          </button>
        </div>
        <ModalFiltros isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <div className="flex justify-end w-full">
            <Button
              className="focus:bg-tremor-brand-emphasis"
              onClick={() => salvar()}
            >
              Salvar
            </Button>
          </div>
        </ModalFiltros>
      </div>
      <div aria-relevant="additions removals" aria-live="polite">
        {isLoading ? (
          <div className="flex h-40 w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 mt-10">
            {totalRegistros && (
              <p>
                <strong>Total de Registros: </strong>
                {Intl.NumberFormat("pt-BR").format(totalRegistros)}
              </p>
            )}
            <figure className="flex flex-col items-center justify-center w-full">
              <div
                className={
                  mostrarVisualizacao === TipoVisualizacao.Grafico
                    ? "w-1/2"
                    : "w-3/4"
                }
              >
                {mostrarVisualizacao === TipoVisualizacao.Grafico && (
                  <BarChartHero
                    data={data}
                    columns={columns}
                    title={tituloGrafico}
                    xAxisLabel={xAxis}
                    estiloGrafico={estiloGrafico}
                  />
                )}
                {mostrarVisualizacao === TipoVisualizacao.Tabela && (
                  <TableA11y
                    data={data}
                    columns={tableColumns}
                    title={tituloGrafico}
                  />
                )}
              </div>
              <div className="mt-10">
                {
                    isAudioRequested 
                    ? <AudioPlayer audioBase64={audio} />
                    : <Button onClick={() => setIsAudioRequested(true)}>Carregar audiodescrição</Button>
                }
                <p className="highcharts-description flex mt-10 items-center justify-center w-full">
                  {descricao}
                </p>
              </div>
            </figure>
          </div>
        )}
      </div>
    </>
  );
}
