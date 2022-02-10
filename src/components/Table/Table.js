import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { openModal } from '../../redux/actions/modalActionCreator';
import { sortUsers } from '../../redux/actions/userActionCreator';
import { Box } from '@mui/material';

const TableComponent = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { users, sortingOptions } = useSelector(store => store.users);

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleNavigate = (data) => {
        const { name, username, email, city, } = data;
        navigate(
            `/edit/${data.id}`,
            {
                state: {
                    name,
                    username,
                    email,
                    city
                }
            }
        )
    };
    const columns = [
        { id: 'id', label: 'id', minWidth: 70 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'username', label: 'User Name', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'city', label: 'City', minWidth: 170 },
        { id: 'action', label: 'Action', minWidth: 170, align: 'center' },
    ];

    const rows = users;
    return (
        <>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ height: 'calc(100vh - 55px)' }} >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={1}>
                                    User
                                </TableCell>
                                <TableCell align="right" colSpan={5}>
                                    <Button variant="contained"
                                        color="success"
                                        size="small"
                                        style={{ marginLeft: 16 }}
                                        onClick={() => navigate('create')}>Add new</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.id === 'action' ? column.label : <Box
                                            onClick={() => dispatch(sortUsers({ columnName: column.id, sortDirection: sortingOptions[column.id] === "desc" ? "asc" : "desc" }))}
                                            sx={{ display: "flex", cursor: "pointer" }}
                                        >
                                            {column.label}
                                            {sortingOptions[column.id] === "desc" ? <span className="material-icons">
                                                arrow_downward
                                            </span> :
                                                <span className="material-icons">
                                                    arrow_upward
                                                </span>
                                            }
                                        </Box>
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length === 0 ? <TableRow><TableCell>Brak danych</TableCell></TableRow> : rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, rowIndex) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                            {columns.map((column) => {
                                                let value = row[column.id];
                                                if (column.id === "city") {
                                                    value = row.address[column.id]
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    )
                                                } else if (column.id === "action") {
                                                    const { id, name, username, address: { city }, email } = row
                                                    const actionData = {
                                                        id,
                                                        name,
                                                        username,
                                                        city,
                                                        email
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                style={{ marginLeft: 16 }}
                                                                onClick={() => handleNavigate(actionData)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                size="small"
                                                                style={{ marginLeft: 16 }}
                                                                onClick={() => dispatch(openModal(actionData, 'delete'))}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    )
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 15, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
        </>
    );
}

export default TableComponent