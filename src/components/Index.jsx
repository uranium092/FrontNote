import { CAlert, CButton } from '@coreui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardImage,
  CCardText,
  CCardBody,
  CCardTitle,
  CToast,
  CToastHeader,
  CToastBody,
} from '@coreui/react';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

dayjs.extend(timezone);
dayjs.extend(utc);

//@mui/x-date-pickers/DateTimePicker
export const Index = () => {
  const goTo = useNavigate();
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const findAllNotes = async () => {
      const getAllNotes = await fetch('http://localhost:8888/allNotes');
      const notesRetrieved = await getAllNotes.json();
      setNotes(notesRetrieved);
    };
    findAllNotes();
  }, []);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DateTimePicker
          //defaultValue={dayjs('2022-08-11')}
          //value={dayjs()}
          maxDateTime={dayjs()}
        ></DateTimePicker>
      </LocalizationProvider>
      <CButton
        onClick={() => {
          goTo('/nuevaNota');
        }}
        color="success"
        style={{ display: 'block', width: '50%', margin: 'auto' }}
      >
        NUEVA NOTA
      </CButton>
      <div
        style={{
          width: '70%',
          margin: '30px auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          gap: '30px',
        }}
      >
        {notes.length > 0 ? (
          notes.map((note) => (
            <CCard key={note._id} style={{ width: '18rem', textAlign: 'center' }}>
              <CCardImage
                orientation="top"
                src="https://plus.unsplash.com/premium_photo-1685287730190-cddbced4834f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <CCardBody>
                <CCardTitle>{note.title}</CCardTitle>
                <CCardText>{note.description}</CCardText>

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <CButton
                    color="dark"
                    data-id={note._id}
                    onClick={(e) => {
                      goTo('/actualizar/' + e.currentTarget.dataset.id);
                    }}
                  >
                    Actualizar
                  </CButton>
                  <CButton
                    color="danger"
                    data-id={note._id}
                    onClick={(e) => {
                      fetch('http://localhost:8888/deleteNote', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'DELETE',
                        body: JSON.stringify({ _id: e.currentTarget.dataset.id }),
                      }).then(() => {
                        window.location.reload();
                      });
                    }}
                  >
                    Eliminar
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          ))
        ) : (
          <CToast animation={false} autohide={false} visible={true}>
            <CToastHeader closeButton>
              <svg
                className="rounded me-2"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
              >
                <rect width="100%" height="100%" fill="black"></rect>
              </svg>
              <div className="fw-bold me-auto">Sin notas</div>
            </CToastHeader>
            <CToastBody>
              Parece que no tienes notas. Inicia <Link to="/nuevaNota">creando</Link> una.
            </CToastBody>
          </CToast>
        )}
      </div>
    </>
  );
};
