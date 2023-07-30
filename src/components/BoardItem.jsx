import { useSelector, useDispatch } from "react-redux";
import { icons } from "../assets";


const BoardItem = ({board}) => {

    const lists = useSelector(store => store.list);
    const tasks = useSelector(store => store.task);

    const dispatch = useDispatch();



    const removeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch({type: 'REMOVE_BOARD', payload: board.id});
        const listsToBeRemoved = lists.filter(item => item.boardId === board.id);
        const tasksToBeRemoved = tasks.filter(item => item.boardId === board.id);

        listsToBeRemoved.forEach(item => {
            dispatch({type: 'REMOVE_LIST', payload: item.id})
        })

        tasksToBeRemoved.forEach(item => {
            dispatch({type: 'REMOVE_TASK', payload: item.id})
        })
    }

    return (
        <div className="board-box d-flex flex-direction-column">
            <div className="d-flex justify-content-between">
                <h5>{board.title}</h5>
                <img onClick={removeHandler} src={icons.crossIcon} alt="" className="add-item-icon" />
            </div>

        </div>
    )
}

export default BoardItem