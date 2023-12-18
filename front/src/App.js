
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Ajouter from './components/page/admin/crud/ajouter';
import TestReact from './components/pageTest0';
import Edit from './components/page/admin/crud/Edit';
import Show from './components/page/admin/crud/show';
import FileUpload from './components/admin/FileUpload';







function App() {
  return (
    <Router> 
    {/* <Navbar />  */}
        <Routes> 
             <Route path="/" element={<Home />}  /> 
             <Route path="/test" element={<TestReact />}  /> 
             <Route path="/ajout" element={<Ajouter />}  /> 
             <Route path="/modif/:id" element={<Edit />}  /> 
             <Route path="/oeuvre/:id" element={<Show />}  /> 
             <Route path="file" element={<FileUpload />}  /> 
               
        </Routes> 
     {/* <Footer /> */}
</Router> ); }


export default App;
