import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import BrachOffices from './pages/BranchOffices';
import Users from './pages/Users';
import Measures from './pages/Measures';
import PrintingOptions from './pages/PrintingOptions';
import Products from './pages/Products';
import Categories from './pages/Categories';

const App = () => (
  <main>
      <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/administrador/usuarios" component={Users}/>
      <Route exact path="/administrador/sucursales" component={BrachOffices}/>
      <Route exact path="/administrador/medidas" component={Measures}/>
      <Route exact path="/administrador/opciones-impresion" component={PrintingOptions}/>
      <Route exact path="/administrador/productos" component={Products}/>
      <Route exact path="/administrador/categorias" component={Categories}/>
      </Switch>
  </main>
);
export default App;
