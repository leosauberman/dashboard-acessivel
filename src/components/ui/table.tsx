import {Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from "@tremor/react";
import {useMemo} from "react";

interface TableA11yProps {
    data: [string, number][],
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
                                columns.map((c, i) => <TableHeaderCell key={i} tabIndex={0}>{c}</TableHeaderCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map(([k, v], i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-bold" tabIndex={0}>{k}</TableCell>
                                    <TableCell tabIndex={0}>{Intl.NumberFormat('pt-BR').format(v)}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
