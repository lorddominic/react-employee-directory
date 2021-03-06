import React from "react";

function Searchbar(props){
    return(
        <div>
            <input
                onChange = {props.handleInputChange}
                value = {props.search}
                name = "search"
                type = "text"
                className = "form-control"
                placeholder = "Search"
                id="Search"
            />
        </div>
    );
}
export default Searchbar;