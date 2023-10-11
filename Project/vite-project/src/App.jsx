import Signup from "./pages/signup"
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from "./pages/login";
import Home from './pages/Home'
import Dashboard from "./pages/Dashboard";
import Forgot from "./pages/forgot";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgot" element={<Forgot/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
       
      
    </BrowserRouter>
      
  )
}

export default App
