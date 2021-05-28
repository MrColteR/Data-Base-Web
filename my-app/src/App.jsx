import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Supplier} from './Supplier';
import {Supply} from './Supply';
import {Details} from './Details';
import {HistoryPrice} from './HistoryPrice';
import {Navigation} from './Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        База данных
      </h3>
    
    <Navigation/>
    
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/supplier' component={Supplier}/>
      <Route path='/supply' component={Supply}/>
      <Route path='/details' component={Details}/>
      <Route path='/historyprice' component={HistoryPrice}/>
      
    </Switch>
    
    </div>
    
    </BrowserRouter>
  );
}
export default App;
