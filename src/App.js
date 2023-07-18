import { BrowserRouter, Route} from "react-router-dom";
import { Switch } from 'react-router-dom';
import ProdukList from "./components/ProdukList";
import TambahProduk from "./components/TambahProduk";
import EditProduk from "./components/EditProduk";
import PesanList from "./components/PesanList";
import JadwalList from "./components/JadwalList";
import TambahJadwal from "./components/TambahJadwal";
import EditJadwal from "./components/EditJadwal";
import Navigation from "./components/Navigation";
import OrderList from "./components/OrderList";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/produk">
          <Navigation/>
          <ProdukList/>
        </Route>
        <Route path="/tambahproduk">
          <TambahProduk/>
        </Route>
        
        <Route path="/pesan">
          <Navigation/>
          <PesanList/>
        </Route>
        <Route path="/order">
          <Navigation/>
          <OrderList/>
        </Route>
        <Route path="/jadwal">
          <Navigation/>
          <JadwalList/>
        </Route>
        <Route path="/tambahjadwal">
          <TambahJadwal/>
        </Route>
        <Route path="/editjadwal/:id">
          <EditJadwal/>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
