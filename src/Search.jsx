import { useState, useEffect } from "react";

function Search(props) {
    const [data, setData] = useState("");
    const [formData, setFormData] = useState("");

    const { inputChange, formSubmit } = props;

    function handleChange(e) {
        setData(e.target.value);
        inputChange(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFormData(e.target.elements.username.value);
        formSubmit(e.target.elements.username.value);
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     sendToParent(data);
    // }

    return (
        // <div>
        //     <input type="text" value={data} onChange={handleChange} />
        //     <button onClick={handleClick}>Send Data to Parent</button>
        // </div>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={data} name="username" className="input-username" placeholder="Enter Spotify Username" />
            <button class="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </form>
    );
}

export default Search;
