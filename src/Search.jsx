import { useState, useEffect } from "react";

function Search(props) {
    const [data, setData] = useState("");

    const { sendToParent } = props;

    function handleChange(e) {
        setData(e.target.value);
        sendToParent(e.target.value);
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     sendToParent(data);
    // }

    return (
        <div>
            <input type="text" value={data} onChange={handleChange} />
            {/* <button onClick={handleClick}>Send Data to Parent</button> */}
        </div>
        // <form onSubmit={handleSubmit}>
        //     <input
        //         type="text"
        //         onChange={handleChange}
        //         value={username}
        //         name="username"
        //         className="input-username"
        //         placeholder="Enter Spotify Username"
        //     />
        //     <button class="btn-search">
        //         <i class="fas fa-search"></i>
        //     </button>
        // </form>
    );
}

export default Search;
