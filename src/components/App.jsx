import React from 'react';
import Card from './Card';

// eslint-disable-next-line react/prop-types
export default function App({ todos }) {
	return(
		<Card todos={todos} />
	);
}