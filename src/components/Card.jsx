import Header from "./Header";
import Form from "./Form";
import ListItem from "./ListItem";
import actions from "../actions";

function Card() {
    return (
        <div className="card">
            <Header />
            <div className="container">
                {actions.map(action => (
                    <ListItem 
                        key={action.id}
                        action={action.action}
                    />
                ))}
            </div>
            <Form />
        </div>
    );
}

export default Card;