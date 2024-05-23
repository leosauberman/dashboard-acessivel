import React, {useEffect, useMemo, useRef, useState} from 'react'
import * as Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import {EstiloGrafico, LanguageOptions} from "@/lib/utils";

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    require('highcharts/modules/accessibility')(Highcharts);
    require('highcharts/modules/pattern-fill')(Highcharts);
    require('highcharts/themes/high-contrast-light')(Highcharts);
}

const dataFormatter = (number: number) =>
    Intl.NumberFormat('pt').format(number).toString();

interface BarChartProps extends HighchartsReact.Props {
    data: [string, number[]][],
    columns: string[],
    title: string;
    xAxisLabel: string[];
    estiloGrafico: EstiloGrafico;
}

export const BarChartHero = ({data, title, xAxisLabel, estiloGrafico, columns, ...props}: BarChartProps) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject | null>(null);
    const [options, setOptions] = useState({
        chart: {
            type: 'column',
        },
        lang: LanguageOptions,
        yAxis: {
            labels: {
                format: "{value}%",
            },
            title: {
                text: "Porcentagem"
            }
        }
    });

    const formattedChartData = useMemo(() => {
        let series: any[];
        if(columns.length > 2) {
            series = data.map(([header, value], index) => ({
                name: header,
                data: value,
                color: estiloGrafico === EstiloGrafico.Padroes ? {patternIndex: index} : null,
                dataLabels: {
                    enabled: true,
                    format: '{y:.2f}%',
                    verticalAlign: "top",
                    style: {
                        fontWeight: 'bold',
                        color: 'black'
                    }
                },
                tooltip: {
                    valueSuffix: "%",
                    valueDecimals: "2"
                }
            }));
        }
        else {
            series = data.map(([header, value], index) => ({
                name: header,
                data: [value],
                color: estiloGrafico === EstiloGrafico.Padroes ? {patternIndex: index} : null,
                dataLabels: {
                    enabled: true,
                    align: 'center',
                    inside: false,
                    verticalAlign: 'middle',
                    format: '{y:.1f}%',
                    style: {
                        fontWeight: 'bold',
                        color: 'black'
                    }
                },
                tooltip: {
                    valueSuffix: "%",
                    valueDecimals: "1"
                }
            }));
        }

        return [{categories: xAxisLabel}, series];
    }, [data, xAxisLabel, estiloGrafico])

    useEffect(() => {
        const [xAxis, series] = formattedChartData;
        //@ts-ignore
        setOptions((prev) => ({
            ...prev,
            xAxis,
            series,
            title: {
                text: title,
                widthAdjust: -100,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking: columns.length > 2 ? "percent" : undefined
                }
            }
        }))
    }, [formattedChartData, title])

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
                {...props}
            />
            {/*<BarChart
                className="p-3"
                data={formattedChartData()}
                index="name"
                categories={['Ano Obito']}
                colors={['amber']}
                valueFormatter={dataFormatter}
                yAxisWidth={96}
                onValueChange={(v) => console.log(v)}
            />*/}
        </>);
}
