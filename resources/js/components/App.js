import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListPage from "./ListPage";
import ReactDOM from "react-dom";
import BuilderPage from "./BuilderPage";
import SubmitPage from "./SubmitPage";
import "../../css/app.css";

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

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
