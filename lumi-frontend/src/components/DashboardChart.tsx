import { Card, CardContent } from "@mui/material"
import { LineChart } from "@mui/x-charts"

export default function DashboardChart({title, series, labels} : {title: string, series: any, labels: string[]}) {
    return (
        <Card sx={{mt: 5}}>
            <CardContent>
                <h2> {title} </h2>
                <LineChart
                    height={300}
                    series={series}
                    xAxis={[{ scaleType: 'point', data: labels}]}
                />
            </CardContent>
        </Card>
    )
}