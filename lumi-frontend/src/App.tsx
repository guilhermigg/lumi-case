//import reactLogo from './assets/react.svg'
import { Container, styled } from '@mui/material';
import './App.css'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormEvent, useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function App() {
  const handleFileChange = (event : any) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Por favor, selecione um arquivo PDF.');
    }
  };

  const handleSubmit = async (event : FormEvent) => {
    event.preventDefault();
    if (pdfFile) {
      const formData = new FormData();
      formData.append('file', pdfFile);

      try {
        const response = await fetch('http://localhost:5000/api/v1/analysis', {
          method: 'POST',
          body: formData,
        });

        if(response.status == 200) {
          return alert("Arquivo enviado!")
        }
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
      }
    } else {
      alert('Por favor, selecione um arquivo antes de enviar.');
    }
  };

  const [pdfFile, setPdfFile] = useState(null);

  return (
    <Container>
      <h1> LUMI Dev Case </h1>
      <form onSubmit={handleSubmit}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload PDF
          <VisuallyHiddenInput 
            type='file'
            accept='.pdf'
            onChange={handleFileChange} 
            />
        </Button>
        <Button type='submit'> Enviar </Button>
      </form>
    </Container>
  )
}
