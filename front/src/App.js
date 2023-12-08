
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Ajouter from './components/admin/ajouter';
import TestReact from './components/pageTest0';







function App() {
  return (
    <Router> 
    {/* <Navbar />  */}
        <Routes> 
             <Route path="/" element={<Home />}  /> 
             <Route path="/test" element={<TestReact />}  /> 
             <Route path="/ajout" element={<Ajouter />}  /> 
               
        </Routes> 
     {/* <Footer /> */}
</Router> ); }


export default App;
