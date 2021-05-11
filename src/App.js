import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import AddAsset from "./components/AddAsset";
import AssetsList from "./components/AssetsList";
import Header from './components/Header';
import Sidebar from './components/Sidebar'


function App() {
  return (
    <div>
        <a href="/tutorials">
          <Header />
        </a>
        <div className="container options mt-2">
          <div className="row">
            <div className="col-3">
             <Sidebar/>
            </div>
            <div className="col-9">
             <AssetsList/>
            </div>
          </div>
        </div>
        <div className="container mt-3">
        <div className="container">
          <div className="row">
            <li className="col-12 nav-item list-unstyled">
            <Link to={"/add"} className="nav-link">
              <strong>Add Asset</strong>
            </Link>
          	</li>
          </div>
        </div>
       
        <Switch>
          <Route exact path="/add" component={AddAsset} />
        </Switch>
      </div>
      </div>
  );
}

export default App;
