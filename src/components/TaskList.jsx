import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";

import { icons } from "../assets";

import TaskCard from "./TaskCard";

const TaskList = ({ taskList }) => {
	const [editMode, setEditMode] = useState(false);
	const [taskTitle, setTaskTitle] = useState("");

	const allTasks = useSelector(store => store.task);
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const taskId = Date.now() + "";
		dispatch({
			type: "CREATE_TASK",
			payload: {
				id: taskId,
				title: taskTitle,
				listId: taskList.id,
				boardId: taskList.boardId,
			},
		});

		dispatch({
			type: "ADD_TASK_ID_TO_LIST",
			payload: {
				id: taskList.id,
				taskId: taskId,
			},
		});

		dispatch({
			type: "ADD_TASK_ID_TO_BOARD",
			payload: {
				id: taskList.boardId,
				taskId: taskId,
			},
		});
		setEditMode(false);
		setTaskTitle("");
	};

	const removeHandler = () => {
		dispatch({ type: "REMOVE_LIST", payload: taskList.id });
		const tasksToBeRemoved = allTasks.filter(
			(item) => item.listId === taskList.id
		);
		tasksToBeRemoved.forEach((item) => {
			dispatch({ type: "REMOVE_TASK", payload: item.id });
		});
		dispatch({
			type: "REMOVE_LIST_ID_FROM_BOARD",
			payload: { id: taskList.boardId, listId: taskList.id },
		});
	};

	return (
		<Droppable droppableId={taskList.id}>
			{(provided) => (
				<div {...provided.droppableProps} ref={provided.innerRef} className="list-container">
					<div className="list-title-container">
						<h5>{taskList.title}</h5>
						<img
							onClick={removeHandler}
							src={icons.crossIcon}
							alt=""
							className="add-item-icon"
						/>
					</div>
					{taskList.tasks
						.map((item) => {
							return allTasks.find((ele) => ele.id === item);
						})
						.map((task, index) => (
							<TaskCard key={task.id} task={task} index={index} />
							// <p key = {task.id}>{task.title}</p>
						))}
					{!editMode ? (
						<AddItem setEditMode={setEditMode} />
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
                    {provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default TaskList;
