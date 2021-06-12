import React from "react";
import Card from "./Card";

export default function App({ todos }) {
    return(
        <div>
            <Card todos={todos} />
        </div>
    );
}