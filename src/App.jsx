import Playlists from "./Playlists";
import Login from "./Login";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
    return code ? <Playlists code={code} /> : <Login />;
}
export default App;
