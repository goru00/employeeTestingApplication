import { useState, useEffect } from 'react';
import {
    Box, 
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Tooltip,
    TableSortLabel,
    TablePagination
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SeverityPill from '../severityPill/severityPill';

function ListItemTable({props}) {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);

    const {
        headers,
        body,
        title
    } = props;

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    }
    return (
        <Card>
            <CardHeader 
                title={props.title}
            />
            <Box 
                sx={{
                    minWidth: 800
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                        {
                            props.headers.map((head, index) => {
                                return (
                                    <TableCell key={index}>
                                        {head}
                                    </TableCell>
                                )
                            })
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.body && props.body.map((row, num) => {
                                return (
                                    <TableRow key={num}>
                                        {
                                            <>
                                                <TableCell>
                                                    {row.userId}
                                                </TableCell>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.email}
                                                </TableCell>
                                                <TableCell>
                                                    {typeof row.isActivated == "boolean" && (
                                                        row.isActivated === true ? "Да" : "Нет"
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {Array.isArray(row.roles) ? (
                                                        row.roles.map((role, pos) => {
                                                            return (pos >= 0 && pos !== row.roles.length - 1) ? `${role}, ` : `${role}`  
                                                        })
                                                    ) : row.roles}
                                                </TableCell>
                                            </>
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </Box>
            <TablePagination 
                labelRowsPerPage='Всего страниц:'
                component="div"
                count={limit}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    )
}

export default ListItemTable;