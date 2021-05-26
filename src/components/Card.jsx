import Header from "./Header";
import Form from "./Form";

function Card() {
    return (
        <div className="card">
            <Header />
            <ul>
                <li>
                    <h2>Hello</h2>
                </li>
                <li>
                    <h2>World</h2>
                </li>
            </ul>
            <Form />
        </div>
    );
}

export default Card;