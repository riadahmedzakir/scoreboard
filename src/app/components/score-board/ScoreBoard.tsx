import { DataGrid, GridCellEditStopParams, MuiEvent } from "@mui/x-data-grid";
import { ScoreBoardProps } from "./ScoreBoard.props";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .scoreboard-table-row-last': {
        background: '#B6C2B9',
        fontWeight: 'bold',
        fontSize: '18px'
    },
    '& .scoreboard-table-row': {
        background: '#F2F1ED'
    },
    '& .scoreboard-header': {
        backgroundColor: '#000000',
        color: '#FFFFFF'
    }
}));

const ScoreBoard = (props: ScoreBoardProps): JSX.Element => {
    const { scores, config, total } = props;

    const [columns, setColumns] = useState<any>([]);
    const [rows, setRows] = useState<any>([]);

    useEffect(() => {
        const columns = [];

        columns.push({
            field: 'round',
            headerName: '',
            headerClassName: 'scoreboard-header',
            headerAlign: 'center',
            editable: false,
            flex: 1
        });

        columns.push(...config.Players.map(x => ({
            field: x.Id,
            headerName: x.Name,
            headerClassName: 'scoreboard-header',
            headerAlign: 'center',
            align: 'center',
            editable: true,
            type: 'number',
            flex: 1
        })))

        const rows = scores.map((score, index) => ({
            id: index + 1,
            round: `Round ${index + 1}`,
            ...score
        }));

        rows.push({ id: rows.length + 1, round: 'Total', ...total });

        setRows(rows);
        setColumns(columns);
    }, [scores, total]);

    const processRowUpdate = (newRow: any) => {
        const updatedRow = { ...newRow, isNew: false };
        console.log(updatedRow);
        return updatedRow;
    };

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
            processRowUpdate={processRowUpdate}
            density="standard"
            isCellEditable={(params) => params.row.id !== rows.length}
            getRowClassName={(params) => params.row.id === rows.length ? 'scoreboard-table-row-last' : 'scoreboard-table-row'}
        />
    )
}

export default ScoreBoard;