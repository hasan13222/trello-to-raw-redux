import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BoardItem from "./BoardItem";

const BoardList = () => {
    const boards = useSelector(store => store.board);
    return (
        <div className="flex-wrap m-top-md d-flex justify-content-around">
            {boards.map(board => (
                <Link key = {board.id} to = {`/boards/${board.id}`}>
                    <BoardItem board = {board}/>
                </Link>
            ))}
        </div>
    )
}

export default BoardList