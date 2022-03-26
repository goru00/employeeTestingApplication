import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';

const CardDiagramProgress = (props) => {
    ChartJS.register(...registerables);
    const theme = useTheme();
    console.log(props)
    const data = {
        datasets: [
            {
                data: [100, 0, 0],
                backgroundColor: ["#13b8a7", "#ffaf20", "#d04342"],
                borderWidth: 8,
                borderColor: "#fff",
                hoverBorderColor: "#fff"
            }
        ],
        labels: [
            "Программирование на языке высокого уровня", 
            "Базы данных", 
            "Теория вероятности и математическая статистика"
        ]
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: {
            padding: 0
        },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    const results = [
        {
            name: "Программирование на языке высокого уровня",
            value: 100,
            color: "#13b8a7"
        },
        {
            name: "Базы данных",
            value: 0,
            color: "#ffaf20"
        },
        {
            name: "Теория вероятности и математическая статистика",
            value: 0,
            color: "#d04342"
        }
    ];

    return (
        <Card {...props}>
            <CardHeader 
                title="Статистика по лучшим предметам"
            />
                <Divider />
                <CardContent>
                    <Box 
                        sx={{
                            height: 300,
                            position: "relative"
                        }}
                    >
                        <Doughnut 
                            data={data}
                            options={options}
                        />
                    </Box>
                    <Box 
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            pt: 2
                        }}
                    >
                        {
                            results.map(({
                                name,
                                value,
                                color
                            }) => (
                                <Box 
                                    key={name}
                                    sx={{
                                        p: 1,
                                        textAlign: "center"
                                    }}
                                >
                                    <Typography 
                                        color="textPrimary"
                                        variant="body1"
                                    >
                                        {name}
                                    </Typography>
                                    <Typography 
                                        style={{ color }}
                                        variant="h4"
                                    >
                                        {value}
                                        %
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </CardContent>
        </Card>
    );
};

export default CardDiagramProgress;