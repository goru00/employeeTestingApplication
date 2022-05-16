import { useState } from 'react';
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

const ListItemTable = (props) => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    }
    const {
        title,
        headers,
        body
    } = props;
    console.log(props)
    return (
        <Card 
            {...props}
        >
            <CardHeader 
                title={title}
            />
            <PerfectScrollbar />
            <Box 
                sx={{
                    minWidth: 800
                }}
            >
                <Table>
                    <TableHead>
                        {
                            headers.map((item, index) => {
                                return (
                                    <TableCell key={index}>
                                        {item}
                                    </TableCell>
                                )
                            })
                        }
                    </TableHead>
                    <TableBody>
                        {
                            body.map((item, index) => {
                                <TableRow
                                    hover
                                    key={index}
                                >
                                    {
                                        item.map((cell, jIndex) => {
                                            console.log(cell);
                                        })
                                    }
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon fontSize="small" />}
                >
                    Посмотреть все
                </Button>
            </Box>
            <TablePagination 
                    labelRowsPerPage='Всего страниц:'
                    component="div"
                    count={body.length}
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