import { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";


import { icons } from "../assets";

import AddItemForm from "./AddItemForm";

const TaskCard = ({ task, index }) => {
	const [taskTitle, setTaskTitle] = useState(task.title);
	const [editMode, setEditMode] = useState(false);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch({
			type: "UPDATE_TASK",
			payload: {
				id: task.id,
				title: taskTitle,
			},
		});

		setEditMode(false);
	};

	const removeHandler = () => {
		dispatch({
			type: "REMOVE_TASK",
			payload: task.id,
		});

		dispatch({
			type: "REMOVE_TASK_ID_FROM_LIST",
			payload: {
				id: task.listId,
				taskId: task.id,
			},
		});

		dispatch({
			type: "REMOVE_TASK_ID_FROM_BOARD",
			payload: {
				id: task.boardId,
				taskId: task.id,
			},
		});
	};

	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided) => {
                // console.log(provided, 'from card');
				return (
					<div 
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
						{!editMode ? (
							<div
								onClick={() => setEditMode(true)}
								className="task-card"
							>
								<p>{task.title}</p>
								<img
									src={icons.crossIcon}
									alt=""
									className="add-item-icon"
									onClick={removeHandler}
								/>
							</div>
						) : (
							<AddItemForm
								title={taskTitle}
								onChangeHandler={(e) => {
									setTaskTitle(e.target.value);
								}}
								setEditMode={setEditMode}
								submitHandler={submitHandler}
							/>
						)}
					</div>
				);
			}}
		</Draggable>
	);
};

export default TaskCard;
