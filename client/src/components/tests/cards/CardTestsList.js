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
import SeverityPill from '../../severityPill/severityPill';

const tests = [
    {
        id: 1,
        discipline: {
            name: "Теория вероятности и математическая статистика"
        },
        date: "21/03/2022",
        time: "02:00:00",
        status: "Не начат"
    },
    {
        id: 2,
        discipline: {
            name: "Базы данных"
        },
        date: "21/03/2022",
        time: "02:00:00",
        status: "В процессе"
    },
    {
        id: 3,
        discipline: {
            name: "Программирование на языке высокого уровня"
        },
        date: "21/03/2022",
        time: "01:00:00",
        status: "Пройден"
    },
    {
        id: 4,
        discipline: {
            name: "Программирование на языке высокого уровня"
        },
        date: "21/03/2022",
        time: "01:00:00",
        status: "Пройден"
    },
    {
        id: 5,
        discipline: {
            name: "Программирование на языке высокого уровня"
        },
        date: "21/03/2022",
        time: "01:00:00",
        status: "Пройден"
    },
    {
        id: 6,
        discipline: {
            name: "Программирование на языке высокого уровня"
        },
        date: "21/03/2022",
        time: "01:00:00",
        status: "Пройден"
    }
];

const CardItemsList = (props) => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    }

    return (
        <Card 
            {...props}
        >
            {
                console.log(page)
            }
            <PerfectScrollbar>
            <Box sx={{
                        minWidth: 800
                    }} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Tooltip 
                                            enterDelay={300}
                                            title="Отсортировать"
                                        >
                                            <TableSortLabel 
                                                active
                                                direction="desc"
                                            >
                                                № теста
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip 
                                            enterDelay={300}
                                            title="Отсортировать"
                                        >
                                            <TableSortLabel 
                                                active
                                                direction="desc"
                                            >
                                                Дисциплина
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip 
                                            enterDelay={300}
                                            title="Отсортировать"
                                        >
                                            <TableSortLabel 
                                                active
                                                direction="desc"
                                            >
                                                Дата завершения
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip 
                                            enterDelay={300}
                                            title="Отсортировать"
                                        >
                                            <TableSortLabel 
                                                active
                                                direction="desc"
                                            >
                                                Время прохождения
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip 
                                            enterDelay={300}
                                            title="Отсортировать"
                                        >
                                            <TableSortLabel 
                                                active
                                                direction="desc"
                                            >
                                                Статус
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tests.slice(0, limit).map((test) => (
                                        <TableRow 
                                            hover
                                            key={test.id}
                                        >
                                            <TableCell>
                                                {test.id}
                                            </TableCell>
                                            <TableCell>
                                                {test.discipline.name}
                                            </TableCell>
                                            <TableCell>
                                                {test.date}
                                            </TableCell>
                                            <TableCell>
                                                {test.time}
                                            </TableCell>
                                            {
                                                test.status && (
                                                    <TableCell>
                                                        <SeverityPill 
                                                            color={
                                                                (test.status === "Пройден" && "success")
                                                                || (test.status === "Не начат" && "error")
                                                                || "warning"}
                                                        >
                                                        {test.status}
                                                        </SeverityPill>
                                                    </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                    </PerfectScrollbar>
                    <TablePagination 
                        labelRowsPerPage='Тестов на странице:'
                        component="div"
                        count={tests.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={limit}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
        </Card>
    );
}

export default CardItemsList;