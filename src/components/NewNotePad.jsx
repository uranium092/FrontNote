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
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewNotePad = () => {
  const [info, setInfo] = useState({ title: "", description: "" });
  const goTo = useNavigate();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CAlert
        color="warning"
        style={{ textAlign: "center", width: "70%", margin: "10px auto" }}
      >
        Esta insertando una nueva nota ...
      </CAlert>
      <CCard style={{ width: "28rem", margin: "60px auto", height: "60vh" }}>
        <CCardImage
          orientation="top"
          src="https://plus.unsplash.com/premium_photo-1685287730190-cddbced4834f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <CCardBody>
          <CCardTitle>
            <CFormInput
              type="text"
              placeholder="Titulo nota"
              name="title"
              onChange={(e) => {
                setInfo({ ...info, [e.target.name]: e.target.value });
              }}
            />
          </CCardTitle>
          <CCardText>
            <CFormTextarea
              style={{ height: "20vh" }}
              placeholder="Descripcion nota"
              name="description"
              onChange={(e) => {
                setInfo({ ...info, [e.target.name]: e.target.value });
              }}
            />
          </CCardText>
        </CCardBody>
      </CCard>
      <CButton
        onClick={async () => {
          if (!info.title.length > 0 || !info.description.length > 0) {
            setVisible(true);
            return;
          }
          const sendData = await fetch("http://localhost:8888/newNotePad", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(info),
          });
          goTo("/");
        }}
        color="success"
        style={{ width: "70%", display: "block", margin: "auto" }}
      >
        Crear Nota
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
          <p>Debe especificar todos los detalles de la nota</p>
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
