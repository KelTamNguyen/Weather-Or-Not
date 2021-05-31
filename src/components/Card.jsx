import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import ListItem from "./ListItem";
import actions from "../actions";

function Card() {
    // const [actions, setActions] = useState(actions);
    
    // function removeItem(id) {
    //     const newActions = actions.filter((action) => action.id !== id);
    //     setActions(newActions);
    // }

    return (
        <div className="card">
            <Header />
            <div className="container">
                {actions.map(action => (
                    <ListItem 
                        key={action.id}
                        id={action.id}
                        action={action.action}
                        //removeItem={removeItem}
                    />
                ))}
            </div>
            <Form />
        </div>
    );
}

export default Card;