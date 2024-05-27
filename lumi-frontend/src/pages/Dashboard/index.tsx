import { LineChart } from "@mui/x-charts";
import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import { Autocomplete, Card, CardContent, Container, Grid, TextField, Typography } from "@mui/material";

export default function Dashboard() {
  const [ customers, setCustomers ] = useState([]);
  const [ monthLabels, setMonthLabels ] = useState<string[]>([]);

  const [ energia, setEnergia ] = useState<number[]>([]);
  const [ energiaSCEE, setEnergiaSCEE] = useState<number[]>([]);
  const [ energiaGDI, setEnergiaGDI] = useState<number[]>([]);

  const [ customerReference, setCustomerReference ] = useState('');

  const [ totalKwh, setTotalKwh ] = useState(0);
  const [ totalPrice, setTotalPrice ] = useState('');

  const fetchCustomers = async () => {
    const response = await fetch('http://localhost:5000/api/v1/customers');
    const result = await response.json();
    const customers = result.customers.map((e: any)  => {
      return {label: e.name, refNumber: e.referenceNumber}
    })
    setCustomers(customers); 
  };

  const getBills = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/electricity/${customerReference}`);  
    const result = await response.json();
    if(!result) return;
    const bills : any[] = result.bills;

    let monthLabels = bills.map((item: { monthReference: string | number | Date; }) => {
      let date = new Date(item.monthReference);
      let month = date.getMonth()+1; 
      let year = date.getFullYear();

      return `${month.toString().padStart(2, '0')}/${year}`
    })

    const electricityResults = bills.map((item: { electricityKwh: number }) => item.electricityKwh)
    const electricityPriceResults = bills.map((item: { electricityPrice: number }) => item.electricityPrice)

    const electricityGDIResults = bills.map((item: { electricityGDIKwh: number }) => item.electricityGDIKwh)

    const electricitySCEEResults = bills.map((item: { electricitySCEEKwh: number }) => item.electricitySCEEKwh)
    const electricitySCEEPriceResults = bills.map((item: { electricitySCEEPrice: number }) => item.electricitySCEEPrice)

    const totalElectricityKwh = electricityResults.reduce((sum, current) => sum + current, 0);
    const totalElectricityPrice = electricityPriceResults.reduce((sum, current) => sum + current, 0);

    const totalElectricitySCEEKwh = electricitySCEEResults.reduce((sum, current) => sum + current, 0);
    const totalElectricitySCEEPrice = electricitySCEEPriceResults.reduce((sum, current) => sum + current, 0);

    let priceTotal = totalElectricityPrice + totalElectricitySCEEPrice;
    priceTotal = parseFloat(priceTotal.toFixed(2))
    let priceTotalFormatted = new Intl.NumberFormat().format(priceTotal)

    setTotalPrice(priceTotalFormatted)
    setTotalKwh(totalElectricityKwh+totalElectricitySCEEKwh)

    setMonthLabels(monthLabels);
    setEnergia(electricityResults)
    setEnergiaSCEE(electricitySCEEResults)
    setEnergiaGDI(electricityGDIResults)
  }

  const firstRender = useRef(true);
  useEffect(() => {
    if(!firstRender.current) getBills();
    else firstRender.current = false
  }, [customerReference])

  useEffect(() => {
    fetchCustomers();
  },[])

  return (
    <>
    <Header title="Dashboard" />
    <Container sx={{mt: 5}}>
      <Autocomplete 
        disablePortal
        // @ts-ignore
        onChange={(event, value) => setCustomerReference(value?.refNumber)}
        filterOptions={(options, state) => {
          const displayOptions = options.filter((option : {label: string, refNumber: string}) =>
            option.label
              .toLowerCase()
              .trim()
              .includes(state.inputValue.toLowerCase().trim()) ||
            option.refNumber.includes(state.inputValue)
          );
  
          return displayOptions;
        }}
        id="customer-select"
        options={customers}
        sx={{width:300}}
        renderInput={params => <TextField {...params} label="Cliente" />}
      />


      <Grid container width={"100%"} spacing={2} sx={{mt: 2}}>
        <Grid item>
          <Card sx={{minWidth: 275}}>
            <CardContent>
              <Typography textAlign={'center'} fontSize={24}> Energia Total </Typography>
              <Typography textAlign={'center'} fontSize={32}> { totalKwh }kwh </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card sx={{minWidth: 275}}>
            <CardContent>
              <Typography textAlign={'center'} fontSize={24}> Valor total (R$) </Typography>
              <Typography textAlign={'center'} fontSize={32}> { totalPrice }</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <h2> Consumo de energia (kwh) por mês </h2>
      <LineChart
        height={300}
        series={[
          { data: energia, label: 'Energia' },
          { data: energiaSCEE, label: 'Energia SCEE' },
          { data: energiaGDI, label: 'Energia GDI' },
        ]}
        xAxis={[{ scaleType: 'point', data: monthLabels}]}
      />
    </Container>
    </>
  )
}