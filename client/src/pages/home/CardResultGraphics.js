import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme, Card, CardHeader, Button, Divider, CardContent, Box } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CardResultGraphics = (props) => {
    ChartJS.register(...registerables);
    const theme = useTheme();
    const data = {
        datasets: [
            {
                backgroundColor: "#3F51B5",
                barPercentage: 0.5,
                barThickness: 12,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: [18, 5, 19, 27, 29, 19, 20],
                label: "Текущая неделя",
                maxBarThickness: 10
            },
            {
                backgroundColor: "#EEE",
                barPercentage: 0.5,
                barThickness: 12,
                borderRadius: 4,
                categoryPercentage: 0.5,
                data: [11, 20, 12, 29, 30, 25, 13],
                label: "Прошлая неделя",
                maxBarThickness: 10
            }
        ],
        labels: [
            "1 августа",
            "2 августа",
            "3 августа",
            "4 августа",
            "5 августа",
            "6 августа",
            "7 августа"
        ]
    };
    const options = {
        animation: false,
        cornerRadius: 20,
        layout: {
            padding: 0
        },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        xAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: false,
                    drawBorded: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        ],
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: "index",
            titleFontColor: theme.palette.text.primary
        }
    };
    return (
        <Card 
            {...props}
        >
            <CardHeader 
                action={(
                    <Button 
                        endIcon={<ArrowDropDownIcon fontSize="small" />}
                        size="small"
                    >
                        За 7 дней
                    </Button>
                )}
                title="Последние результаты"
            />
            <Divider />
            <CardContent>
                <Box 
                    sx={{
                        height: 400,
                        position: "relative"
                    }}
                >
                    <Bar 
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
            <Divider />
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
                    Подробности
                </Button>
            </Box>
        </Card>
    )
}

export default CardResultGraphics;