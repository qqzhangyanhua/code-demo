import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import RequireAuth from "./component/Loyout/RequireAuth";
import EditPage from "./pages/EditPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RequireAuth />}>
            <Route path="list" element={<ListPage />}></Route>
            <Route index element={<EditPage />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
