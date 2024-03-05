import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './UpdateTask';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTaskFromServer, removeFromList, setSelectedTask } from './Slice/TaskSlice'
import { getTaskFromServer } from './Slice/TaskSlice';

function Tasklist() {
    const { taskList } = useSelector((state) => state.task)

    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);

    const updateTask = (task) => {
        setModalShow(true)
        dispatch(setSelectedTask(task))
    }

    useEffect(() => {
        dispatch(getTaskFromServer())
    }, [dispatch])

    const deleteTask = (task) => {
        dispatch(deleteTaskFromServer(task))
            .unwrap()
            .then(() => {
                dispatch(removeFromList(task))
            })
    }


    return (
        <>
            <Table striped>
                <thead className='text-center'>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {taskList && taskList.map((task, index) => {
                        return (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.Description}</td>
                                <td>
                                    <Button variant="primary" onClick={() => updateTask(task)}><i className="bi bi-pencil-square"></i></Button>{' '}
                                    <Button variant="primary" onClick={() => deleteTask(task)}><i className="bi bi-trash3"></i></Button>{' '}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Tasklist;
