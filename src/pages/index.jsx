import Login from "../Login";

const code = new URLSearchParams(window.location.search).get("code");
sessionStorage.setItem("code", JSON.stringify(code));

function Home() {
    return <Login />;
}
export default Home;
