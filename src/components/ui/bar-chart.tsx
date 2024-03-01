import React, {useEffect, useMemo, useRef, useState} from 'react'
import * as Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    require('highcharts/modules/accessibility')(Highcharts);
    require('highcharts/modules/pattern-fill')(Highcharts);
}

const dataFormatter = (number: number) =>
    Intl.NumberFormat('pt').format(number).toString();

interface BarChartProps extends HighchartsReact.Props {
    data: [string, number][],
    title: string;
    xAxisLabel: string;
}

export const BarChartHero = ({data, title, xAxisLabel, ...props}: BarChartProps) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject | null>(null);
    const [options, setOptions] = useState({
        chart: {
            type: 'column',
        }
    });

    const formattedChartData = useMemo(() => {
        const series = data.map(([header, value], index) => ({
            name: header,
            data: [value],
            color: {patternIndex: index}
        }));

        console.log(series);

        return [{categories: [xAxisLabel]}, series];
    }, [data, xAxisLabel])

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
