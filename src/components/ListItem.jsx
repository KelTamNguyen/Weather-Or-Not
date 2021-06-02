import { useState } from "react";
import EditForm from "./EditForm";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai"

function ListItem({ id, action }) {

    const [editing, setEditing] = useState("false");

    function toggleEdit(e) {
        setEditing(!editing);
        e.preventDefault();
    }

    //placeholder
    function remove(e) {
        console.log("remove: " + id);
        e.preventDefault();
    }

    return(
        <div className="list-item">
            {editing === true ?  <EditForm value={action} id={id} /> : <h2>{action}</h2>}
            <div className="btn-div">
                {/* <input type="radio"></input> */}
                <button onClick={toggleEdit}>
                    <AiFillEdit />
                </button>
                <button onClick={remove}>
                    <AiFillCloseCircle />
                </button>
            </div>
        </div>
    );
}

export default ListItem;