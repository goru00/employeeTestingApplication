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
    TableSortLabel
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SeverityPill from '../severityPill/severityPill';

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
    }
];

const CardItemsList = (props) => {
    return (
        <Card 
            {...props}
        >
            <CardHeader 
                title="Последние тесты"
            />
            <PerfectScrollbar>
            <Box sx={{
                        minWidth: 800
                    }} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        № теста
                                    </TableCell>
                                    <TableCell>
                                        Дисциплина
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
                                        Время прохождения
                                    </TableCell>
                                    <TableCell>
                                        Статус
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tests.map((test) => (
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
                        size="small"
                        variant="text"
                    >
                        Посмотреть все
                    </Button>
                </Box>
        </Card>
    );
}

export default CardItemsList;