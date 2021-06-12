import React from "react";
import Card from "./Card";

export default function App({ todos }) {
    return(
            <Card todos={todos} />
    );
}