import { useState, useEffect } from "react";

function Search(props) {
    const [user, setUser] = useState("");

    const { inputChange, formSubmit } = props;

    function handleChange(e) {
        setUser(e.target.value);
        inputChange(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        formSubmit(e.target.elements.username.value);
        setUser("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={user} name="username" className="input-username" placeholder="Enter Spotify Username" />
            <button class="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </form>
    );
}

export default Search;
