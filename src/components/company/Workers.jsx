import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import { TextField, Typography, Button, Card, CardContent,  } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Workers = () => {
  const [data, setData] = useState({ name: '', age: '' });
  const [workers,setWorkers]=useState([]);
  useEffect(()=>{
    const getAll=async()=>{
      const response=await fetch("http://localhost:8888/getWorkers/"+JSON.parse(sessionStorage.getItem("company"))._id);
      const body=await response.json();
      setWorkers(body);
    };
    getAll();
  },[]);
  return (
    <>
      <Typography variant="h3">
        Empresa:{' '}
        <span style={{ fontWeight: 'bold' }}>
          {JSON.parse(sessionStorage.getItem('company')).name}
        </span>
      </Typography>{' '}
      <br></br>
      <form
        style={{ marginLeft: '10px' }}
        onSubmit={async (e) => {
          e.preventDefault();
          const dataSend = { data, _id: JSON.parse(sessionStorage.getItem('company'))._id };
          await fetch('http://localhost:8888/newWorker', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataSend),
          });
          window.location.reload();
        }}
      >
        <Typography variant="h4">Nuevo Trabajador:</Typography>
        <TextField
          required
          label="Nombre Trabajador"
          variant="outlined"
          name="name"
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        ></TextField>{' '}
        <br />
        <br />
        <TextField
          required
          label="Edad Trabajador"
          type="number"
          variant="outlined"
          name="age"
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        ></TextField>{' '}
        <br />
        <br />
        <Button type="submit" variant="contained">
          Registrar
        </Button>
      </form>
      <div style={{marginTop:"30px"}}>
          <Typography variant='h4'>Todos los trabajadores ...</Typography>
          {workers.map(w=>(
            <Card sx={{ maxWidth: 145 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {w.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                edad: {w.age}
              </Typography>
            </CardContent>
          </Card>
          ))}
      </div>
    </>
  );
};
