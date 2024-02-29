import {Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from "@tremor/react";
import {useMemo} from "react";

interface TableA11yProps {
    data: { [key: string]: number[] },
    columns: string[];
    title: string;
}

export const TableA11y = ({data, columns, title}: TableA11yProps) => {

    return (
        <>
            <h3 className="mb-5">{title}</h3>
            <div className="border border-solid border-slate-300 rounded">
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((c, i) => <TableHeaderCell key={i}>{c}</TableHeaderCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.entries(data).map(([k, v], i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-bold">{k}</TableCell>
                                    <TableCell>{Intl.NumberFormat('pt-BR').format(v)}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
