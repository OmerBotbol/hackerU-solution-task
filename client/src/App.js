import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListPage from './components/ListPage';
import BuilderPage from './components/BuilderPage';
import SubmitPage from './components/SubmitPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListPage} />
        <Route exact path="/build" component={BuilderPage} />
        <Route exact path="/:id" component={SubmitPage} />
      </Switch>
    </Router>
  );
}

export default App;
