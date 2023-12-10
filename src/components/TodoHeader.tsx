import React, { useState } from 'react'
import { Date, Level, Priority, TodoItemRequest } from '../consts/todoList';

type Props = { handleAddTodo : (todo: TodoItemRequest) => void } ;

export default function TodoHeader({ handleAddTodo }: Props) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [dueDate, setDueDate] = useState("Mon");
    const [priority, setPriority] = useState<Priority>("high");
    const [level, setLevel] = useState(1);

    const dateList = [
      { key: "Mon", value: "월요일"} ,
      { key: "Tue", value: "화요일"} ,
      { key: "Wed", value: "수요일"} ,
      { key: "Thu", value: "목요일"} ,
      { key: "Fri", value: "금요일"} ,
      { key: "Sat", value: "토요일"} ,
      { key: "Sun", value: "일요일"} , ] ;  


  return (
   
        <div className="p-3 bg-blue-100 h-fit w-fit flex flex-col text-xl">
제목{""} <input 
type= "text"
value ={title}
onChange={(event) => setTitle(event.target.value)} />
작성자{""} <input 
type= "text"
value ={author}
onChange={(event) => setAuthor(event.target.value)} />
요일{""} 
<select onChange={(e) => setDueDate(e.target.value)}
value={dueDate}>
  {dateList.map((item)=> (<option value={item.key}>{item.value}</option>))}
</select>
중요도 {""}
<select
value= {priority}
onChange={(event) => setPriority(event.target.value as Priority)} >
  <option value="high">high</option>
  <option value="medium">medium</option>
  <option value="low">low</option>
</select>
단계 {""}
<select
value= {level}
onChange={(event) => setLevel(Number(event.target.value))} >
  <option value={1}>1</option>
  <option value={2}>2</option>
  <option value={3}>3</option>
</select>


<button className="bg-blue-800 text-white"
onClick={() => {
  console.log({title, 
    progress: "TODO", 
    level : level as Level,
    priority : priority,
    dueDate: dueDate as Date,
    author, })
    handleAddTodo({
    title, 
    progress: "TODO", 
    level : level as Level,
    priority : priority,
    dueDate: dueDate as Date,
    author,
    })
  
  setTitle("")  
  setAuthor("") 
  setDueDate("Mon")
  setPriority("high")
  setLevel(1);
  }}
>
추가
</button>




</div>


  )
}