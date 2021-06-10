import React from "react";
import Card from "./Card";

function App({ todos }) {
    return(
        <div>
            <Card todos={todos} />
        </div>
    );
}

export default App;