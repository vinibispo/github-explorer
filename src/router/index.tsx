import {BrowserRouter, Route, Switch} from "react-router-dom";
import {RepositoryList} from "../pages/RepositoryList";

export function Router () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={RepositoryList} />
      </Switch>
    </BrowserRouter>
  )
}
