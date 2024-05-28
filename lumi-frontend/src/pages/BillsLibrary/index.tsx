import { useEffect, useState } from "react";
import Header from "../../components/Header";
import customerService from "../../services/customerService";
import { Autocomplete, Button, Container, TextField } from "@mui/material";
import billService from "../../services/billService";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from "../../services/api";

export default function BillsLibrary() {
    const [ customers, setCustomers ] = useState<customerList[]>([]);
    const [ customerReference, setCustomerReference ] = useState('');

    const [ bills, setBills ] = useState<IBill[]>([])

    function getMonthYear(date: Date | string) {
      const dateParsed = new Date(date);
      const month = dateParsed.getUTCMonth()+1;
      const year = dateParsed.getUTCFullYear();
      return `${month}/${year}`
    }

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'electricityKwh',
          headerName: 'Energia (kwh)',
          type: 'number',
          width: 110,
          sortable: false
        },
        {
          field: 'electricityPrice',
          headerName: 'Energia (R$)',
          type: 'number',
          width: 110,
        },
        {
          field: 'electricitySCEEKwh',
          headerName: 'Energia SCEE (kwh)',
          type: 'number',
          width: 110,
        },
        {
          field: 'electricitySCEEPrice',
          headerName: 'Energia SCEE (R$)',
          type: 'number',
          width: 110,
        },
        {
          field: 'electricityGDIKwh',
          headerName: 'Energia GDI (kwh)',
          type: 'number',
          width: 110,
        },
        {
          field: 'electricityGDIPrice',
          headerName: 'Energia GDI (R$)',
          type: 'number',
          width: 110,
        },
        {
          field: 'municipalPublicLightingContribution',
          headerName: 'Contrib. Municipal Iluminação Pública',
          type: 'number',
          width: 110,
        },
        {
          field: 'monthReference',
          headerName: 'Mês de Referência',
          type: 'string',
          width: 110,
          valueGetter: (value, row) => getMonthYear(value)
        },
        {
          field: 'billFileName',
          headerName: 'Ações',
          type: 'string',
          renderCell: (params) => {
            const currentRow = params.row;
            const downloadURL = api.baseURL+'download/'+currentRow.billFileName
      
            return <a style={{textDecoration: 'none'}} href={downloadURL} download> Download </a>;
          }
        },
      ];

    const rows = [
        ...bills
    ];
      
    async function fetchBills() {
        if(customerReference == '') return
        const bills = await billService.getCustomerBills(customerReference);
        setBills(bills);
    }

    async function fetchCustomers() {
        const customers : ICustomer[] = await customerService.getCustomers();
        const customersList : customerList[] = customers.map((e: any)  => {
            return {label: e.name, refNumber: e.referenceNumber}
        });

        setCustomers(customersList); 
    }

    useEffect(() => {
        if(customerReference == '')
            fetchCustomers();
        fetchBills();
    }, [customerReference])

    return (
        <>
        <Header title="Biblioteca" />
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


            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </div>
        </Container>
        </>
    )
}