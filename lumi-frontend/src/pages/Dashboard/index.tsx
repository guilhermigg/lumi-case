import { LineChart, ResponsiveChartContainer } from "@mui/x-charts";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Autocomplete, Container, TextField } from "@mui/material";

export default function Dashboard() {
  const [ customers, setCustomers ] = useState([]);
  const [ monthLabels, setMonthLabels ] = useState<string[]>([]);

  const [ energia, setEnergia ] = useState<number[]>([]);
  const [ energiaSCEE, setEnergiaSCEE] = useState<number[]>([]);
  const [ energiaGDI, setEnergiaGDI] = useState<number[]>([]);

  const [ customerReference, setCustomerReference ] = useState('');

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
      let month = date.getMonth(); 
      let year = date.getFullYear();

      return `${month.toString().padStart(2, '0')}/${year}`
    })

    let electricityResults = bills.map((item: { electricityKwh: number }) => item.electricityKwh)
    let electricityGDIResults = bills.map((item: { electricityGDIKwh: number }) => item.electricityGDIKwh)
    let electricitySCEEResults = bills.map((item: { electricitySCEEKwh: number }) => item.electricitySCEEKwh)

    setMonthLabels(monthLabels);
    setEnergia(electricityResults)
    setEnergiaSCEE(electricitySCEEResults)
    setEnergiaGDI(electricityGDIResults)
  }

  useEffect(() => {
    getBills();
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
      <h2> Consumo de energia (kwh) por mês </h2>
      <LineChart
        width={500}
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