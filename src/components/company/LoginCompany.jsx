import { Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginCompany = () => {
  const goTo = useNavigate();
  const [data, setData] = useState({ name: '', password: '' });
  return (
    <>
      <form
        style={{
          margin: 'auto',
          width: '50%',
          textAlign: 'center',
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          border: '1px solid black',
          borderRadius: '15px',
          padding: '20px',
        }}
        className="mt-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('http://localhost:8888/authCompany', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          if (response.status == 404) return alert('empresa sin registrar');
          const bodyResponse = await response.json();
          sessionStorage.setItem('company', JSON.stringify(bodyResponse[0]));
          goTo('/workers');
        }}
      >
        <Typography variant="h3">-LOGIN- Empresa</Typography>
        <TextField
          id="outlined-basic"
          required
          label="Nombre Empresa"
          variant="outlined"
          className="w-50"
          name="name"
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <TextField
          id="outlined-basic"
          required
          label="Contrasena acceso"
          variant="outlined"
          className="w-50"
          type="password"
          name="password"
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <Button type="submit" variant="contained" sx={{ width: '20%' }}>
          Ingresar
        </Button>
      </form>
    </>
  );
};
