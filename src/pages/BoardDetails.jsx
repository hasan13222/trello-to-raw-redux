import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import TaskList from "../components/TaskList";

const BoardDetails = () => {
	const [editMode, setEditMode] = useState(false);
	const [listTitle, setListTitle] = useState("");

	const { boardId } = useParams();


	const lists = useSelector(store => store.list);
	
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const listId = Date.now() + "";

		dispatch({
			type: "CREATE_LIST",
			payload: {
				id: listId,
				title: listTitle,
				boardId: boardId,
			},
		});

		dispatch({
			type: "ADD_LIST_ID_TO_BOARD",
			payload: {
				id: boardId,
				listId: listId,
			},
		});

		setEditMode(false);
		setListTitle("");
	};

    const dragHandler = (result) => {
        const {source, draggableId, destination} = result;

        if (!destination) {
            return
        }

        if ((source.droppableId === destination.droppableId) && (source.index === destination.index)) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            dispatch({
                type: 'CHANGE_LIST_ID',
                payload: {
                    id: draggableId,
                    listId: destination.droppableId
                }
            })
        }

        dispatch({
            type: 'SORT_TASK_IDS_IN_LIST',
            payload: {
                source,
                destination,
                draggableId
            }
        })

    }

	return (
		<DragDropContext onDragEnd={dragHandler}>
			<div className="d-flex m-top-sm flex-direction-row">
				<Link to="/">Back to Boards</Link>
				{lists
					.filter((item) => item.boardId === boardId)
					.map((taskList) => (
						<TaskList key={taskList.id} taskList={taskList} />
					))}

				{!editMode ? (
					<AddItem listAddItem={true} setEditMode={setEditMode} />
				) : (
					<AddItemForm
						title={listTitle}
						listForm={true}
						onChangeHandler={(e) => {
							setListTitle(e.target.value);
						}}
						setEditMode={setEditMode}
						submitHandler={submitHandler}
					/>
				)}
			</div>
		</DragDropContext>
	);
};

export default BoardDetails;
