import { useState } from "react";
import EditForm from "./EditForm";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai"

function ListItem({ id, action, removeItem }) {

    const [editing, setEditing] = useState("false");

    return(
        <li className="list-item">
            {editing ? <h2>{action}</h2> : <EditForm value={action} id={id} />}
            <div className="btn-group">
                <button id={id} type="button" onClick={()=> {setEditing(!editing)}}>
                    <AiFillEdit />
                </button>
                <button onClick={() => {removeItem(id)}}>
                    <AiFillCloseCircle />
                </button>
            </div>
        </li>
    );
}

export default ListItem;