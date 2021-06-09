import { useState } from "react";
import EditForm from "./EditForm";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai"

function ListItem({ id, action }) {

    const [editing, setEditing] = useState("false");

    //placeholder
    function remove(e) {
        console.log("remove: " + id);
        e.preventDefault();
    }

    return(
        <div className="list-item">
            {editing ? <h2>{action}</h2> : <EditForm value={action} id={id} />}
            <div className="btn-group">
                <button onClick={()=> {setEditing(!editing)}}>
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