import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addTaskToServer } from './Slice/TaskSlice';

function Addtask() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [Description, setDescription] = useState("")

    const addTask = (e) => {
        e.preventDefault()
        if (title !== "" && Description !== "") {
            dispatch(addTaskToServer({ title, Description }))
        }
        setTitle("")
        setDescription('')

    }
    return (
        <div className='my-5'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Task Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="text " placeholder="Enter task Description" value={Description} onChange={(e) => { setDescription(e.target.value) }} />
                </Form.Group>

                <div className='text-end'>
                    <Button variant="primary" type="submit" onClick={addTask}>
                        Add Task
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Addtask