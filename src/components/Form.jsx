import {React, useState} from "react";

function Form() {

    const [userInput, setUserInput] = useState("");

    function handleChange(e) {
        setUserInput(e.currentTarget.value)
    }

    return(
        <div className="card-bottom">
            <form className="add-to-list">
                <hr />
                <input 
                    type="text" 
                    id="my-input" 
                    placeholder="Add Item" 
                    name="todo"
                    onChange={handleChange}
                />
                <button 
                    type="button" 
                    name="button"
                >
                    ADD ITEM
                </button>
            </form>
        </div>
    );
}

export default Form;