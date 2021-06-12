import { useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai"

function ListItem({ id, action, removeItem, editItem }) {

    const [editing, setEditing] = useState("false");
    const [currentValue, setCurrentValue] = useState("");


    function handleChange(e) {
        setCurrentValue(e.currentTarget.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        editItem(id, currentValue);
        setCurrentValue("");
        setEditing(false);
    }

    const viewTemplate = (
        <div className="list-item">
            <h2>{action}</h2>
            <div className="btn-group">
                <button
                    type="button"
                    onClick={() => {setEditing(true)}}
                >
                    <AiFillEdit />
                </button>
                <button 
                    type="button"
                    onClick={() => {removeItem(id)}}  
                >
                    <AiFillCloseCircle />
                </button>
            </div>
        </div>
    );

    const editingTemplate = (
        <div className="list-item">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="my-input" 
                    placeholder={action} 
                    name="todo" 
                    onChange={handleChange} 
                    value={currentValue} 
                />
                <button>
                    <i className="fas fa-check" />
                </button>
            </form>
            <div className="btn-group">
                <button
                    type="button"
                    onClick={() => {setEditing(false)}}
                >
                    <AiFillEdit />
                </button>
                <button 
                    type="button"
                    onClick={() => {removeItem(id)}}  
                >
                    <AiFillCloseCircle />
                </button>
            </div>
        </div>
    );

    return(
        // {viewTemplate}
        <li>
            {(editing === true) ? editingTemplate : viewTemplate} 
        </li>
    );
}

export default ListItem;