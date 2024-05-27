import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import { Autocomplete, Container, Grid, TextField } from "@mui/material";
import DashboardChart from "../../components/DashboardChart";
import DashboardCardNumbers from "../../components/DashboardCardNumbers";

export default function Dashboard() {
  const [ customers, setCustomers ] = useState([]);
  const [ customerReference, setCustomerReference ] = useState('');
  const [ monthLabels, setMonthLabels ] = useState<string[]>([]);

  const [ energia, setEnergia ] = useState<number[]>([]);
  const [ energiaSCEE, setEnergiaSCEE] = useState<number[]>([]);
  const [ energiaGDI, setEnergiaGDI] = useState<number[]>([]);

  const [ electricityPrice, setElectricityPrice ] = useState<number[]>([]);
  const [ electricitySCEEPrice, setElectricitySCEEPrice ] = useState<number[]>([]);
  const [ electricityGDIPrice, setElectricityGDIPrice ] = useState<number[]>([]);

  const [ totalKwh, setTotalKwh ] = useState(0);
  const [ totalPrice, setTotalPrice ] = useState('0');

  const fetchCustomers = async () => {
    const response = await fetch('http://localhost:5000/api/v1/customers');
    const result = await response.json();
    const customers = result.customers.map((e: any)  => {
      return {label: e.name, refNumber: e.referenceNumber}
    })
    setCustomers(customers); 
  };

  function getEnergyPriceData(bills : any) {
    const electricityResults = bills.map((item: { electricityPrice: number }) => item.electricityPrice)
    const electricityGDIResults = bills.map((item: { electricityGDIPrice: number }) => item.electricityGDIPrice)
    const electricitySCEEResults = bills.map((item: { electricitySCEEPrice: number }) => item.electricitySCEEPrice)

    const totalElectricityPrice = electricityResults.reduce((sum: number, current: number) => sum + current, 0);
    const totalElectricityGDIPrice = electricityGDIResults.reduce((sum: number, current: number) => sum + current, 0);
    const totalElectricitySCEEPrice = electricitySCEEResults.reduce((sum: number, current: number) => sum + current, 0);

    let priceTotal = totalElectricityPrice + totalElectricitySCEEPrice + totalElectricityGDIPrice;
    priceTotal = parseFloat(priceTotal.toFixed(2))
    let priceTotalFormatted = new Intl.NumberFormat().format(priceTotal)

    setTotalPrice(priceTotalFormatted)

    setElectricityPrice(electricityResults)
    setElectricitySCEEPrice(electricitySCEEResults)
    setElectricityGDIPrice(electricityGDIResults)
  }

  function getEnergyConsumptionData(bills : any) {
    const electricityResults = bills.map((item: { electricityKwh: number }) => item.electricityKwh)
    const electricityGDIResults = bills.map((item: { electricityGDIKwh: number }) => item.electricityGDIKwh)
    const electricitySCEEResults = bills.map((item: { electricitySCEEKwh: number }) => item.electricitySCEEKwh)

    const totalElectricityKwh = electricityResults.reduce((sum:number, current:number) => sum + current, 0);
    const totalElectricitySCEEKwh = electricitySCEEResults.reduce((sum:number, current:number) => sum + current, 0);

    setTotalKwh(totalElectricityKwh+totalElectricitySCEEKwh)

    setEnergia(electricityResults)
    setEnergiaSCEE(electricitySCEEResults)
    setEnergiaGDI(electricityGDIResults)
  }

  const getBills = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/electricity/${customerReference}`);  
    const result = await response.json();
    if(!result) return;
    const bills : any[] = result.bills;

    let monthLabels = bills.map((item: { monthReference: string; }) => {
      let date = new Date(item.monthReference);
      let month = date.getUTCMonth()+1; 
      let year = date.getUTCFullYear();

      return `${month.toString().padStart(2, '0')}/${year}`
    });

    setMonthLabels(monthLabels);

    getEnergyConsumptionData(bills);
    getEnergyPriceData(bills);
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
        <DashboardCardNumbers title="Total de Energia" value={totalKwh+'kwh'} />
        <DashboardCardNumbers title="Valor Total" value={'R$'+totalPrice} />
      </Grid>

      <DashboardChart
        title={"Consumo de energia (kwh) por mês"}
        series={[
              { data: energia, label: 'Energia' },
              { data: energiaSCEE, label: 'Energia SCEE' },
              { data: energiaGDI, label: 'Energia GDI' },
        ]}
        labels={monthLabels}
      />

      <DashboardChart
        title={"Valor da energia (R$)"}
        series={[
              { data: electricityPrice, label: 'Energia' },
              { data: electricitySCEEPrice, label: 'Energia SCEE' },
              { data: electricityGDIPrice, label: 'Energia GDI' },
        ]}
        labels={monthLabels}
      />
    </Container>
    </>
  )
}