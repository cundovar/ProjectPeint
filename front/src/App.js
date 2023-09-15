import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Ajouter from './components/admin/ajouter';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router> 
    {/* <Navbar />  */}
        <Routes> 
             <Route path="/" element={<Home />}  /> 
             <Route path="/ajoutoeuvre" element={<Ajouter />}  /> 
        </Routes> 
     {/* <Footer /> */}
</Router> ); }


export default App;
