import { useState } from 'react';
import {
    Box, 
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    Checkbox,
    Avatar,
    Link
} from '@mui/material';


import PerfectScrollbar from 'react-perfect-scrollbar';
import SeverityPill from '../severityPill/severityPill';
import { useNavigate } from 'react-router-dom';

function ListItemTable({props}) {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);

    let navigate = useNavigate();

    const {
        headers,
        body,
        links
    } = props;

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    }

    const handleSelectRow = (value) => {
        console.log(value.target)
    }

    return (
        <PerfectScrollbar>
        <Box
            sx={{
                maxWidth: '400'
            }}
        >
             <Table
                sx={{
                    width: '100%',
                    maxWidth: '400'
                }}
             >
                 <TableHead>
                     <TableRow>
                     <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            
                        />
                    </TableCell>
                         {
                             headers && headers.map((head, index) => {
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
                         links && body && body.map((row, num) => {
                             const labelId = `checkbox-list-secondary-label-${row}`;
                             return (
                                    <TableRow
                                        key={num}
                                        hover
                                        tabIndex={-1}
                                        sx={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() => navigate(`${links[num]}`)}
                                    >
                                     <TableCell
                                        padding="checkbox"
                                     >
                                         <Checkbox 
                                            color="primary"
                                            inputProps={{
                                                'aria-labelledby': labelId
                                            }}
                                         />
                                     </TableCell>
                                     {
                                         Object.keys(row).map((k, index) => {
                                            return k === "avatar" && (
                                                <Avatar 
                                                    alt={`Avatar n${index + 1}`}
                                                />
                                            )
                                         })
                                     }
                                     {
                                         Object.values(row).map((value, key) => {
                                            return (
                                                <TableCell
                                                    key={key}
                                                >
                                                    {
                                                        typeof value === "boolean" ? (
                                                            <SeverityPill
                                                                color={value === true ? "success" : "error"}
                                                            >
                                                                {value === true ? "Да" : "Нет"}
                                                            </SeverityPill>
                                                        ) : Array.isArray(value) ? (
                                                                value.map((c, pos) => {
                                                                    return (pos >= 0 && value.length - 1) ? `${c}, ` :`${c}`
                                                                })
                                                        ) : value
                                                    }
                                                </TableCell>
                                             ) 
                                         })
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
        </PerfectScrollbar>
    )
}

export default ListItemTable;