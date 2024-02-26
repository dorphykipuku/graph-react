import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navb from "./components/Navb";
import FormPost from "./components/FormPost";
import Mapsapi from "./components/Mapsapi";

import HomePage from "./components/HomePage";
import ListPoste from "./components/ListPoste";
import Avis from "./components/Avis";
import Login from "./components/Login";
import CreateCompte from "./components/CreateCompte";
import FormAvis from "./components/FormAvis";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <Login />
        } />
        <Route path="/compte" element={<CreateCompte />} />
        <Route path="/loc" element={
        <><Navb/><Mapsapi /></>
       } />
        <Route path="/formp" element={
        <><Navb/><FormPost /></>
       } />
        <Route path="/formavis" element={
        <><Navb/><FormAvis /></>
       } />
        <Route path="/sta" element={
        <><Navb/><HomePage /></>
       } />
        <Route path="/a/:id" element={
        <><Navb/><Avis /></>
        } />
        <Route path="/avis" element={
          <><Navb/><ListPoste /></>
      } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
