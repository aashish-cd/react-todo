import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
import { BiAddToQueue } from 'react-icons/bi'


const getLocalStorage = () => {
 let task = localStorage.getItem('task')
 if (task) {
  return (task = JSON.parse(localStorage.getItem('task')))
 }
 else {
  return []
 }
}
const App = () => {
 const [name, setName] = useState('')
 const [task, setTask] = useState(getLocalStorage())
 const [green, setGreen] = useState([])


 const handleSubmit = (e) => {
  e.preventDefault();
  if (!name) {
   return 0;
  }

  else {
   const newName = { id: new Date().getTime().toString(), title: name }
   setTask([...task, newName])
   setName('')
   console.log(task);

  }

 }
 const changeColor = (id) => {
  const doneTask = task.find((item) => item.id === id)
  setGreen([...green, doneTask])
  setTask(task.filter((item) => item.id !== id))


 }
 const deleteTask = (id) => {
  const newTask = task.filter((item) => item.id !== id)
  setTask(newTask)

 }
 const removeDone = (id) => {
  const newGreen = green.filter((item) => item.id !== id)
  setGreen(newGreen)
 }
 useEffect(() => {
  localStorage.setItem('task', JSON.stringify(task))
 }, [task])
 return (
  <div className="container">
   <form onSubmit={handleSubmit} className="input">
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <button type="submit" className='add'><BiAddToQueue /></button>
   </form>
   <div className="list">
    {
     green.map((item) => {
      const { id, title } = item;
      return (
       <div className="list-container" key={id}>
        <p className='done-text'>{title}</p>

        <button onClick={() => removeDone(id)}><FaTrash className='done-delete' /></button>
       </div>
      )
     })
    }

    {task.map((item) => {
     const { id, title } = item;
     return (
      <div className="list-container" key={id}>
       <p className='text'>{title}</p>
       <button onClick={() => changeColor(id)}><MdDone className='done' /></button>
       <button onClick={() => deleteTask(id)}><FaTrash className='delete' /></button>
      </div>
     )
    })}




   </div>
  </div>
 )
}

export default App
