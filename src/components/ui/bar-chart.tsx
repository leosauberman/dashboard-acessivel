import {BarChart} from '@tremor/react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import * as Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    require('highcharts/modules/accessibility')(Highcharts);
}

const dataFormatter = (number: number) =>
    Intl.NumberFormat('pt').format(number).toString();

interface BarChartProps extends HighchartsReact.Props {
    data: { [key: string]: number[] },
    title: string;
    xAxisLabel: string;
}

export const BarChartHero = ({data, title, xAxisLabel, ...props}: BarChartProps) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject | null>(null);
    const [options, setOptions] = useState({
        chart: {
            type: 'column',
        },
        title: {
            text: title,
            widthAdjust: -100,
            useHTML: true
        }
    });

    const formattedChartData = useMemo(() => {
        const series = Object.entries(data).map(([k, v]) => {
            return {
                name: k,
                data: v,
            }
        })

        return [{categories: [xAxisLabel]}, series];
    }, [data, xAxisLabel])

    useEffect(() => {
        const [xAxis, series] = formattedChartData;
        setOptions((prev) => ({
            ...prev,
            xAxis,
            series
        }))
    }, [formattedChartData, setOptions])

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
