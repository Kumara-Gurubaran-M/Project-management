import React from 'react'
import { useSelector } from 'react-redux'

function Navbar() {
  const { taskList, error } = useSelector((state) => state.task)
  return (
    <div>
      <h1 className='text-center my-4 text-primary' >Project Managemant</h1>
      <p className='text-center lead'>{`Currently ${taskList.length} tasks  pending`}</p>
      {
        (error !== '') ? <h4 className='text-center text-danger'>{error}</h4> : null
      }
    </div>
  )
}

export default Navbar