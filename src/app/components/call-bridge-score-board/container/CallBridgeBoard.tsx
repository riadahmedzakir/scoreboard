import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CallBridgeBoardProps } from "./CallBridgeBoard.props";

const StyledDataGrid = styled(DataGrid)(() => ({
    '& .scoreboard-table-row-last': {
        background: '#F2F1ED'
    },
    '& .scoreboard-table-row': {
        background: '#F2F1ED'
    },
    '& .scoreboard-header': {
        backgroundColor: '#000000',
        color: '#FFFFFF'
    },
    "& .MuiDataGrid-cell:nth-child(3)": {
        borderLeft: "1px solid #e0e0e0",
    },
    "& .MuiDataGrid-cell:nth-child(4)": {
        borderLeft: "1px solid #e0e0e0",
    }
}));

const CallBridgeBoard = (props: CallBridgeBoardProps): JSX.Element => {
    const { scores, config } = props;

    const [columns, setColumns] = useState<any>([]);
    const [rows, setRows] = useState<any>([]);

    const processRowUpdate = (newRow: any) => {
        const updatedRow = { ...newRow, isNew: false };

        return updatedRow;
    }

    useEffect(() => {
        const columns = [];

        columns.push({
            field: 'round',
            headerName: '',
            headerClassName: 'scoreboard-header',
            headerAlign: 'center',
            align: "center",
            display: 'flex',
            editable: false,
            flex: 1,
            rowSpanValueGetter: (value: any, row: any) => {
                return value;
            },
        });

        columns.push({
            field: 'type',
            headerName: '',
            headerClassName: 'scoreboard-header',
            headerAlign: 'center',
            align: "center",
            editable: false,
            flex: 1,
            cellClassName: 'text-bold',
            rowSpanValueGetter: () => null
        });

        columns.push(...config.Players.map(x => ({
            field: x.Id,
            headerName: x.Name,
            headerClassName: 'scoreboard-header',
            headerAlign: 'center',
            align: 'center',
            editable: true,
            type: 'number',
            flex: 1,
            rowSpanValueGetter: () => null
        })))

        const rows = scores.flatMap((score, index) => {
            if (index === 0) {
                return [{ id: 1, round: "Free Call", ...score[1] }];
            }

            return score.map((data: any, i: number) => ({
                id: `${index}-${i === 0 ? "Call" : "Trick"}-${i}`,
                round: `Round ${index + 1}`,
                type: i === 0 ? "Call" : "Trick",
                ...data,
            }));
        });


        setColumns(columns);
        setRows(rows);
    }, [scores]);

    return (
        <StyledDataGrid
            sx={{
                width: '100%',
                '& .super-app-theme--header': {
                    backgroundColor: '#000000',
                    color: '#ffffff'
                },
            }}
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 100,
                    },
                },
            }}
            disableRowSelectionOnClick
            disableColumnSorting
            disableColumnResize
            disableColumnMenu
            hideFooter
            hideFooterPagination
            hideFooterSelectedRowCount
            unstable_rowSpanning
            processRowUpdate={processRowUpdate}
            density="standard"
            isCellEditable={(params) => params.row.id !== rows.length}
            getRowClassName={(params) => params.row.id === rows.length ? 'scoreboard-table-row-last' : 'scoreboard-table-row'}
        />
    )
}

export default CallBridgeBoard;