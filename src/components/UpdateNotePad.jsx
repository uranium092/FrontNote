import { useNavigate, useParams } from 'react-router-dom';
import {
  CAlert,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CFormInput,
  CFormTextarea,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react';
import { useEffect, useState } from 'react';

export const UpdateNotePad = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({ title: '', description: '' });
  const goTo = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:8888/findById/' + params.id);
      const body = await response.json();
      setData(body);
      setDataUpdate({ title: body.title, description: body.description });
    };
    getData();
  }, []);

  return (
    <>
      <CAlert color="warning" style={{ textAlign: 'center', width: '70%', margin: '10px auto' }}>
        Esta editando esta nota ...
      </CAlert>
      <CCard style={{ width: '28rem', margin: '60px auto', height: '60vh' }}>
        <CCardImage
          orientation="top"
          src="https://plus.unsplash.com/premium_photo-1685287730190-cddbced4834f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <CCardBody>
          <CCardTitle>
            <CFormInput
              type="text"
              defaultValue={data.title}
              placeholder="Titulo nota"
              name="title"
              onChange={(e) => {
                setDataUpdate({ ...dataUpdate, [e.target.name]: e.target.value });
              }}
            />
          </CCardTitle>
          <CCardText>
            <CFormTextarea
              defaultValue={data.description}
              style={{ height: '20vh' }}
              placeholder="Descripcion nota"
              name="description"
              onChange={(e) => {
                setDataUpdate({ ...dataUpdate, [e.target.name]: e.target.value });
              }}
            />
          </CCardText>
        </CCardBody>
      </CCard>
      <CButton
        style={{ width: '70%', display: 'block', margin: 'auto' }}
        color="success"
        onClick={async (e) => {
          if (!dataUpdate.title.length > 0 || !dataUpdate.description.length > 0) {
            setVisible(true);
            return;
          }
          const updateSuccess = await fetch('http://localhost:8888/updateNote/' + params.id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(dataUpdate),
          });
          goTo('/');
        }}
      >
        Actualizar
      </CButton>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Aviso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Debe especificar todos los detalles de actualizacion la nota</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
