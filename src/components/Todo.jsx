import React from 'react'

const style = {
li:`flex justify-between bg-slate-200 p-3 my-2 capitalize`,
liComplete:`flex justify-between bg-slate-400 p-3 my-2 capitalize`,
row:`flex `,
text:`ml-2 cursor-pointer`,
textComplete:`ml-2 cursor-pointer line-through`,
button : `cursor-pointer flex items-center`
}

const Todo = ({todo,toggleComplete,deleteTodo}) => {
  return (
    <li className={todo.completed ? style.liComplete : style.liComplete}>
        <div className={style.row}>
            <input onClick={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked':''}/>
            <p onClick={() => toggleComplete(todo)}className={todo.completed ? style.textComplete: style.text }>{todo.text}</p>
        </div>
        <button onClick={() => deleteTodo(todo.id)}>
           <span class="material-symbols-outlined">
             delete
           </span>
        </button>

    </li>
  )
}

export default Todo