import Dashboard from "./Dashboard";
import Login from "./Login";

const code = new URLSearchParams(window.location.search).get("code");
const storedAccessToken = sessionStorage.getItem("access_token");

function App() {
    return code || storedAccessToken ? <Dashboard code={code} /> : <Login />;
}
export default App;
