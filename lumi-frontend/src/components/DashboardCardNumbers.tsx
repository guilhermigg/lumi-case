import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function DashboardCardNumbers({title, value} : {title: string, value: string | number}){
    return (
        <Grid item>
          <Card sx={{minWidth: 275}}>
            <CardContent>
              <Typography textAlign={'center'} fontSize={24} color="gray"> {title} </Typography>
              <Typography textAlign={'center'} fontSize={32}> { value } </Typography>
            </CardContent>
          </Card>
        </Grid>
    )
}