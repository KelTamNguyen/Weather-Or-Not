import {React, useState} from "react";
import actions from "../actions";

function Form() {

    const [userInput, setUserInput] = useState("");

    function updateToDo(e) {
        setUserInput(e.currentTarget.value)
    }

    function addToDo(e) {
        e.preventDefault();
        let id = actions.length + 1;
        actions.push({id: id, action: userInput});
    }

    return(
        <div className="card-bottom">
            <form className="add-to-list" onSubmit={addToDo}>
                <hr />
                <input 
                    type="text" 
                    id="my-input" 
                    placeholder="Add Item" 
                    name="todo"
                    onChange={updateToDo}
                />
                <button>
                    ADD ITEM
                </button>
            </form>
        </div>
    );
}

export default Form;