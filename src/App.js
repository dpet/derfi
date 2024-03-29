
import './App.scss';
import ConnectionProvider from './components/helpers/ConnectionProvider.js';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Home from './components/pages/Home.jsx';
import FactoryMonitor from './components/pages/FactoryMonitor.jsx';
import FactoryLeaderboard from './components/pages/FactoryLeaderboard.jsx';
import ChefMonitor from './components/pages/ChefMonitor.jsx';
import LiquidityPoolFinder from './components/pages/LiquidityPoolFinder.jsx';
import LiquidityPoolMonitor from './components/pages/LiquidityPoolMonitor.jsx';
import ImpermanentLoss from './components/pages/ImpermanentLoss.jsx';
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

          <div className="main">
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

              <Route exact path="/liquidityPoolFinder">
                <LiquidityPoolFinder></LiquidityPoolFinder>
              </Route>

              <Route exact path="/liquidityPoolMonitor">
                <LiquidityPoolMonitor></LiquidityPoolMonitor>
              </Route>

              <Route exact path="/chefMonitor">
                <ChefMonitor></ChefMonitor>
              </Route>

              <Route exact path="/impermanentLoss">
                <ImpermanentLoss></ImpermanentLoss>
              </Route>

              <Route exact path="/docs">
                <Docs></Docs>
              </Route>
            </Switch>
          </div>

          <Footer></Footer>
        </ConnectionProvider>
      </Router>
    </div>
  );
}

export default App;
