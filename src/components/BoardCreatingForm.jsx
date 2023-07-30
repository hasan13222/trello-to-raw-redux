import { useState } from 'react';
import { useDispatch } from 'react-redux';

const BoardCreatingForm = () => {
    const [boardTitle, setBoardTitle] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'CREATE_BOARD', payload: boardTitle });
        setBoardTitle('');
    }
    return (
        <div className="align-center m-top-md">
            <form onSubmit={handleSubmit}>
                <input type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} />
                <button type='submit'>Create Board</button>
            </form>
        </div>
    )
}

export default BoardCreatingForm