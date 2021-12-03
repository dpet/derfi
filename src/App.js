
import './App.scss';
import ConnectionProvider from './data/ConnectionProvider.jsx';
import Header from './components/common/Header.jsx';
import Home from './components/pages/Home.jsx';
import FactoryMonitor from './components/pages/Factory.jsx';
import RouterMonitor from './components/pages/Router.jsx';
import LiquidityPools from './components/pages/LiquidityPools.jsx';
import Docs from './components/pages/Docs.jsx';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <ConnectionProvider>
          <Header></Header>

          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route exact path="/factory">
              <FactoryMonitor></FactoryMonitor>
            </Route>

            <Route exact path="/router">
              <RouterMonitor></RouterMonitor>
            </Route>

            <Route exact path="/liquidity_pools">
              <LiquidityPools></LiquidityPools>
            </Route>

            <Route exact path="/docs">
              <Docs></Docs>
            </Route>
          
          </Switch>
        </ConnectionProvider>
      </Router>
    </div>
  );
}

export default App;
