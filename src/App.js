import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter, Routes} from 'react-router-dom';
import Navigation from "./Components/Navigation/Navigation";
import { Navigate } from 'react-router-dom';
import Gluer from "./Pages/Gluer/Gluer";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Gluer/>} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />

          </Route>
        </Routes>


      </BrowserRouter>
  );
}

export default App;
