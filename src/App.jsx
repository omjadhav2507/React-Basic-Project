import React, { useState ,useEffect } from 'react'
import Todo from './components/Todo';
import {  collection, onSnapshot, query, updateDoc , doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';


const style = {
  bg:`h-screen w-s p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container : `bg-slate-100 max-w-[500px] w-full m-auto rounded-md p-4`,
  heading : `text-3xl font-bold text-center text-gray-800 p-2`,
  form : `flex justify-between`,
  input : `border p-2 w-full tex-xl`,
  button : ` p-3 ml-2 bg-purple-800`,
  count:`text-center p-2`
  
}

function App() {

  const [todos , setTodos] = useState([
    
  ]);
  const [input , setInput ] = useState();


  // create todo

   const createTodo = async (e) =>{
    e.preventDefault(e);
    if(input === ""){
      alert('pleases enter valid todo')
      return
    }
    await addDoc(collection(db,'todos'),{
      text:input,
      completed:false,
    })
    setInput('');
    
   }
  // Read todos from  firebase
    useEffect(()=>{
      const q = query(collection(db , 'todos'))
      const unsubscribe = onSnapshot(q, (querySnapshot) =>{
        let todosArr = []
        querySnapshot.forEach((doc)=>{
            todosArr.push({...doc.data(), id: doc.id})
        });
        setTodos(todosArr)
      })
      return () => unsubscribe;
    },[])

  // update todos in firebase
  const toggleComplete =  async (todo) => {
    await updateDoc (doc(db,'todos', todo.id),{
       completed : !todo.completed
    })
  }
  // Delete to todo

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.heading}>
          Todo App
        </div>
        <form onSubmit = {createTodo} className={style.form}>
          <input  value={input} onChange={(e)=>setInput(e.target.value)} type='text' placeholder='Add Todo' className={style.input}/>
          <button className={style.button}>
            <span class="material-symbols-outlined">
               add
            </span>
          </button>
        </form>

        <ul>
        {todos.map((todo) => (
            <Todo 
            key={todo.id} 
            todo={todo} 
            toggleComplete = {toggleComplete}
             deleteTodo={deleteTodo} />
          ))}

        </ul>
        {todos.length < 1 ? null :  <p className={style.count}>{`You have ${todos.length} Todos`}</p>}
      </div>
    </div>
  )
}

export default App
