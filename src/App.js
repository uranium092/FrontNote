import { useEffect } from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Index } from './components/Index';
import { NewNotePad } from './components/NewNotePad';
import { UpdateNotePad } from './components/UpdateNotePad';
import { Login } from './components/Login';
import { Panel } from './components/admin/Panel';
import { LoginCompany } from './components/company/LoginCompany';
import { Workers } from './components/company/Workers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/nuevaNota" element={<NewNotePad />} />
        <Route path="/actualizar/:id" element={<UpdateNotePad />}></Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/panelAdmin" element={<Panel />} />
        <Route path="/loginCompany" element={<LoginCompany></LoginCompany>}></Route>
        <Route path="/workers" element={<Workers></Workers>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
