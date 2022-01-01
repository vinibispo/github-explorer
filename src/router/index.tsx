import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RepositoryList} from "../pages/RepositoryList";

export function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
      </Routes>
    </BrowserRouter>
  )
}
