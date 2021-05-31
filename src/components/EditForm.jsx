import { useState } from "react";
import actions from "../actions";

function EditForm({ value, id }) {

    const [userInput, setUserInput] = useState("");
    const [currentValue, setCurrentValue] = useState(value);

    function handleChange(e) {
        setUserInput(e.currentTarget.value);
        setCurrentValue(e.currentTarget.value);
    }

    //placeholder function
    function applyEdit(e) {
        console.log(currentValue);
        e.preventDefault();
    }

    return (
        <form>
            <input 
                type="text" 
                id="my-input" 
                placeholder="Add Item" 
                name="todo" 
                onChange={handleChange} 
                value={currentValue} 
            />
            <button onClick={applyEdit}>
                <i className="fas fa-check" />
            </button>
        </form>
    )

}

export default EditForm;