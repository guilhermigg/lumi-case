import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import { Autocomplete, Container, Grid, TextField } from "@mui/material";
import DashboardChart from "../../components/DashboardChart";
import DashboardCardNumbers from "../../components/DashboardCardNumbers";
import customerService from "../../services/customerService";
import billService from "../../services/billService";

export default function Dashboard() {
  const [ customers, setCustomers ] = useState<customerList[]>([]);
  const [ customerReference, setCustomerReference ] = useState('');
  const [ monthLabels, setMonthLabels ] = useState<string[]>([]);

  const [ electricityConsumption, setElectricityConsumption ] = useState<number[]>([]);
  const [ compensatedElectricity, setCompensatedElectricity ] = useState<number[]>([]);

  const [ electricityValue, setElectricityValue ] = useState<number[]>([]);
  const [ electricityValueGDI, setElectricityValueGDI ] = useState<number[]>([]);

  const [ totalKwh, setTotalKwh ] = useState(0);
  const [ totalPrice, setTotalPrice ] = useState('0');

  const firstRender = useRef(true);
  useEffect(() => {
    if(!firstRender.current) getBills();
    else firstRender.current = false
  }, [customerReference])

  useEffect(() => {
    fetchCustomers();
  },[])

  const fetchCustomers = async () => {
    const customers : ICustomer[] = await customerService.getCustomers();
    const customersList : customerList[] = customers.map((e: any)  => {
      return {label: e.name, refNumber: e.referenceNumber}
    });

    setCustomers(customersList); 
  };

  function getElectricityPriceData(bills : IBill[]) {
    const electricityPriceData = billService.getElectricityPrice(bills);

    setTotalPrice(electricityPriceData.priceTotalFormatted)
    setElectricityValue(electricityPriceData.electricityResults)
    setElectricityValueGDI(electricityPriceData.electricityGDIResults)
  }

  function getEnergyConsumptionData(bills : IBill[]) {
    const electricityData = billService.getElectricityData(bills);

    setTotalKwh(electricityData.totalElectricityKwh);
    setElectricityConsumption(electricityData.electricityConsumptionResult);
    setCompensatedElectricity(electricityData.compensatedElectricity);
  }

  const getBills = async () => {
    const bills = await billService.getCustomerBills(customerReference);

    let monthLabels = bills.map((item: { monthReference: Date }) => {
      let date = new Date(item.monthReference);
      let month = date.getUTCMonth()+1; 
      let year = date.getUTCFullYear();

      return `${month.toString().padStart(2, '0')}/${year}`
    });

    setMonthLabels(monthLabels);

    getEnergyConsumptionData(bills);
    getElectricityPriceData(bills);
  }

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
              { data: electricityConsumption, label: 'Consumo de Energia' },
              { data: compensatedElectricity, label: 'Energia Compensada' },
        ]}
        labels={monthLabels}
      />

      <DashboardChart
        title={"Valor da energia (R$)"}
        series={[
          { data: electricityValue, label: 'Valor total sem GDI' },
          { data: electricityValueGDI, label: 'Valor GDI' },
        ]}
        labels={monthLabels}
      />
    </Container>
    </>
  )
}