
export enum TipoVisualizacao {
    Nenhuma = "none",
    Grafico = "grafico",
    Tabela = "tabela"
}

export enum EstiloGrafico {
    Padroes = "padroes",
    Cores = "cores"
}

export const LanguageOptions = {
    accessibility: {
        chartContainerLabel: 'Gráfico intitulado {title}',
        credits: 'Créditos: {creditsStr}',
        defaultChartTitle: 'Gráfico sem título',
        drillUpButton: 'Retornar a {buttonText}',
        graphicContainerLabel: 'Contêiner gráfico',
        svgContainerLabel: 'Contêiner SVG para gráfico intitulado {chartTitle}',
        svgContainerTitle: '',
        thousandsSep: ',',
        zoom: {
            mapZoomIn: "Aumentar zoom",
            mapZoomOut: "Diminuir zoom",
            resetZoomButton: 'Redefinir zoom'
        }
    },
    contextButtonTitle: 'Menu de contexto',
    decimalPoint: ',',
    downloadCSV: 'Baixar CSV',
    downloadJPEG: 'Baixar imagem JPEG',
    downloadMIDI: 'Baixar MIDI',
    downloadPDF: 'Baixar PDF',
    downloadPNG: 'Baixar imagem PNG',
    downloadSVG: 'Baixar imagem SVG',
    downloadXLS: 'Baixar XLS',
    exitFullscreen: 'Sair do modo de tela cheia',
    exportData: {
        annotationHeader: "Anotação",
        categoryDatetimeHeader: "Categoria (Data/Hora)",
        categoryHeader: "Categoria"
    },
    hideData: 'Esconder dados',
    invalidDate: '',
    loading: 'Carregando...',
    mainBreadcrumb: 'Principal',
    months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    navigation: {
        popup: {
            addButton: "Adicionar",
            algorithm: "Algoritmo",
            arrowInfinityLine: "Linha Infinita",
            arrowRay: "Raio",
            arrowSegment: "Segmento",
            average: "Média",
            background: "Fundo",
            backgroundColor: "Cor do Fundo",
            backgroundColors: "Cores de Fundo",
            borderColor: "Cor da Borda",
            borderRadius: "Raio da Borda",
            borderWidth: "Largura da Borda",
            bottomBand: "Banda Inferior",
            circle: "Círculo",
            clearFilter: "Limpar Filtro",
            color: "Cor",
            connector: "Conector",
            crooked3: "Curvado 3",
            crooked5: "Curvado 5",
            crosshairX: "Mira X",
            crosshairY: "Mira Y",
            decimals: "Decimais",
            deviation: "Desvio",
            editButton: "Editar",
            elliott3: "Elliott 3",
            elliott5: "Elliott 5",
            ellipse: "Elipse",
            factor: "Fator",
            fastAvgPeriod: "Período Média Rápida",
            fibonacci: "Fibonacci",
            fibonacciTimeZones: "Zonas de Tempo Fibonacci",
            fill: "Preenchimento",
            flags: "Bandeiras",
            fontSize: "Tamanho da Fonte",
            format: "Formato",
            height: "Altura",
            highIndex: "Índice Alto",
            horizontalLine: "Linha Horizontal",
            increment: "Incremento",
            index: "Índice",
            indicatorAliases: {
                // Indicator aliases options
            },
            infinityLine: "Linha Infinita",
            initialAccelerationFactor: "Fator de Aceleração Inicial",
            innerBackground: "Fundo Interno",
            label: "Rótulo",
            labelOptions: "Opções de Rótulo",
            labels: "Rótulos",
            line: "Linha",
            lines: "Linhas",
            longPeriod: "Período Longo",
            lowIndex: "Índice Baixo",
            maxAccelerationFactor: "Fator de Aceleração Máximo",
            measure: "Medir",
            measureX: "Medir X",
            measureXY: "Medir XY",
            measureY: "Medir Y",
            multiplier: "Multiplicador",
            multiplierATR: "Multiplicador ATR",
            name: "Nome",
            noFilterMatch: "Nenhum Filtro Correspondente",
            outerBackground: "Fundo Externo",
            padding: "Preenchimento",
            parallelChannel: "Canal Paralelo",
            period: "Período",
            periodATR: "Período ATR",
            periods: "Períodos",
            periodSenkouSpanB: "Período Senkou Span B",
            periodTenkan: "Período Tenkan",
            pitchfork: "Garfo",
            ranges: "Faixas",
            ray: "Raio",
            rectangle: "Retângulo",
            removeButton: "Remover",
            saveButton: "Salvar",
            searchIndicators: "Buscar Indicadores",
            segment: "Segmento",
            series: "Séries",
            shapeOptions: "Opções de Forma",
            shapes: "Formas",
            shortPeriod: "Período Curto",
            signalPeriod: "Período de Sinal",
            simpleShapes: "Formas Simples",
            slowAvgPeriod: "Período Média Lenta",
            standardDeviation: "Desvio Padrão",
            stroke: "Traço",
            strokeWidth: "Largura do Traço",
            style: "Estilo",
            timeCycles: "Ciclos de Tempo",
            title: "Título",
            topBand: "Banda Superior",
            tunnel: "Túnel",
            typeOptions: "Opções de Tipo",
            verticalArrow: "Seta Vertical",
            verticalCounter: "Contador Vertical",
            verticalLabel: "Rótulo Vertical",
            verticalLine: "Linha Vertical",
            volume: "Volume",
            xAxisUnit: "Unidade do Eixo X"
        }
    },
    noData: 'Sem dados para exibir',
    numericSymbolMagnitude: 1000,
    numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
    playAsSound: 'Tocar como som',
    printChart: 'Imprimir gráfico',
    rangeSelectorFrom: 'De',
    rangeSelectorTo: 'Para',
    rangeSelectorZoom: 'Zoom',
    resetZoom: 'Redefinir zoom',
    resetZoomTitle: 'Redefinir zoom para nível 1:1',
    shortMonths: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
    ],
    shortWeekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    stockTools: {
        gui: {
            advanced: "Avançado",
            arrowInfinityLine: "Linha Infinita",
            arrowRay: "Raio",
            arrowSegment: "Segmento",
            circle: "Círculo",
            crooked3: "Curvado 3",
            crooked5: "Curvado 5",
            crookedLines: "Linhas Curvas",
            currentPriceIndicator: "Indicador de Preço Atual",
            elliott3: "Elliott 3",
            elliott5: "Elliott 5",
            ellipse: "Elipse",
            fibonacci: "Fibonacci",
            fibonacciTimeZones: "Zonas de Tempo Fibonacci",
            flagCirclepin: "Bandeira com Pino Circular",
            flagDiamondpin: "Bandeira com Pino Diamante",
            flags: "Bandeiras",
            flagSimplepin: "Bandeira com Pino Simples",
            flagSquarepin: "Bandeira com Pino Quadrado",
            fullScreen: "Tela Cheia",
            horizontalLine: "Linha Horizontal",
            indicators: "Indicadores",
            infinityLine: "Linha Infinita",
            label: "Rótulo",
            line: "Linha",
            lines: "Linhas",
            measure: "Medir",
            measureX: "Medir X",
            measureXY: "Medir XY",
            measureY: "Medir Y",
            parallelChannel: "Canal Paralelo",
            pitchfork: "Garfo",
            ray: "Raio",
            rectangle: "Retângulo",
            saveChart: "Salvar Gráfico",
            segment: "Segmento",
            simpleShapes: "Formas Simples",
            timeCycles: "Ciclos de Tempo",
            toggleAnnotations: "Alternar Anotações",
            typeCandlestick: "Candlestick",
            typeChange: "Alterar Tipo",
            typeHeikinAshi: "Heikin Ashi",
            typeHLC: "HLC",
            typeHollowCandlestick: "Candlestick Oco",
            typeLine: "Linha",
            typeOHLC: "OHLC",
            verticalArrow: "Seta Vertical",
            verticalCounter: "Contador Vertical",
            verticalLabel: "Rótulo Vertical",
            verticalLabels: "Rótulos Verticais",
            verticalLine: "Linha Vertical",
            zoomChange: "Alterar Zoom",
            zoomX: "Zoom X",
            zoomXY: "Zoom XY",
            zoomY: "Zoom Y"
        }
    },
    thousandsSep: '.',
    viewData: 'Ver dados',
    viewFullscreen: 'Visualizar em tela cheia',
    weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    zoomIn: '+',
    zoomOut: '-'
}
