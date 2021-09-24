/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';

export default function ListItem({ id, task, removeTask, editTask, completed, toggleCompletionStatus }) {

	const [editing, setEditing] = useState('false');
	const [currentValue, setCurrentValue] = useState('');


	function handleChange(e) {
		setCurrentValue(e.currentTarget.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		editTask(id, currentValue);
		setCurrentValue('');
		setEditing(false);
	}

	const defaultTemplate = (
		<div className="list-item">
			<div className="item-label">
				<input 
					className="checkbox" 
					type="checkbox" 
					defaultChecked={completed}
					onChange={() => toggleCompletionStatus(id)}
				/>
				<label htmlFor="action">
					<h2>{task}</h2>
				</label>
			</div>
			<div className="btn-group">
				<button
					type="button"
					onClick={() => {setEditing(true);}}
				>
					<AiFillEdit />
				</button>
				<button 
					type="button"
					onClick={() => {removeTask(id);}}  
				>
					<AiFillCloseCircle />
				</button>
			</div>
		</div>
	);

	const editingTemplate = (
		<div className="list-item">
			<form onSubmit={handleSubmit}>
				<input 
					type="text" 
					id="my-input" 
					placeholder={task} 
					name="todo" 
					onChange={handleChange} 
					value={currentValue} 
				/>
				<button>
					<i className="fas fa-check" />
				</button>
			</form>
			<div className="btn-group">
				<button
					type="button"
					onClick={() => {setEditing(false);}}
				>
					<AiFillEdit />
				</button>
				<button 
					type="button"
					onClick={() => {removeTask(id);}}  
				>
					<AiFillCloseCircle />
				</button>
			</div>
		</div>
	);

	return(
		<li>
			{(editing === true) ? editingTemplate : defaultTemplate} 
		</li>
	);
}