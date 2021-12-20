
import './App.scss';
import ConnectionProvider from './components/helpers/ConnectionProvider.js';
import Header from './components/common/Header.jsx';
import Home from './components/pages/Home.jsx';
import FactoryMonitor from './components/pages/FactoryMonitor.jsx';
import FactoryLeaderboard from './components/pages/FactoryLeaderboard.jsx';
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
              {/*<Home></Home>*/}
              <FactoryMonitor></FactoryMonitor>
            </Route>

            <Route exact path="/factoryMonitor">
              <FactoryMonitor></FactoryMonitor>
            </Route>

            <Route exact path="/factoryLeaderboard">
              <FactoryLeaderboard></FactoryLeaderboard>
            </Route>

            <Route exact path="/liquidity_pools">
              <LiquidityPools></LiquidityPools>
            </Route>
          
          </Switch>
        </ConnectionProvider>
      </Router>
    </div>
  );
}

export default App;
