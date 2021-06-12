import {React, useState} from "react";

function Form({ addTask }) {

    const [userInput, setUserInput] = useState("");

    function updateToDo(e) {
        setUserInput(e.currentTarget.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }

    return(
        <div className="card-bottom">
            <hr />
            <form className="add-to-list" onSubmit={handleSubmit}>  
                <input 
                    type="text" 
                    id="my-input" 
                    placeholder="Add Item" 
                    name="todo"
                    onChange={updateToDo}
                    value={userInput}
                />
                <button>
                    ADD ITEM
                </button>
            </form>
        </div>
    );
}

export default Form;