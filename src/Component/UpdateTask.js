import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskInServer } from './Slice/TaskSlice';

export default function MyVerticallyCenteredModal(props) {
    const { selectedTask } = useSelector((state) => state.task)
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [id, setId] = useState(0)

    const updateTask = () => {
        props.onHide()
        dispatch(updateTaskInServer({ id, title, Description }))
    }

    useEffect(() => {
        if (Object.keys(selectedTask).length !== 0) {
            setTitle(selectedTask.title)
            setDescription(selectedTask.Description)
            setId(selectedTask.id)
        }
    }, [selectedTask])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control type="text " placeholder="Enter task Description" value={Description} onChange={(e) => { setDescription(e.target.value) }} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>

                <div className='text-end'>
                    <Button variant="primary" type="submit" onClick={updateTask}>
                        Update Task
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}