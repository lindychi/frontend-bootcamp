import React, { ReactNode } from 'react'
import clsx from 'clsx'
import { TodoItem } from '../consts/todoList';
import { TodoIcon } from '../App';

type Props = { 
  title : string ,
  icon : ReactNode ,
  list : TodoItem[],
 // completeButton : 
 handleDelete :  (deleteId: number) => void
 handleComplete : (itemId: number) => void
}




export default function ListForm({ title, list, icon, handleDelete, handleComplete}: Props) {
  return (
    <div className="bg-blue-100 w-[533px] h-fit p-[24px]  rounded-lg flex flex-col gap-5 items-start">
  <div className="flex flex-row gap-2">
    <div>{icon}</div>
    <div className="text-2xl text-blue-800 font-bold">{title}</div>
  </div>
  {list.map((item, index) => 
  <div key={index} className="bg-white w-[465px] p-[24px] grid gap-2 rounded-lg">
    <div className="font-bold text-lg"> {item.title}</div>
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-2">
        <div className={clsx('p-2 rounded-md', {
        'bg-priority-high': item.priority === 'high',
        'bg-priority-medium': item.priority === 'medium',
        'bg-priority-low': item.priority === 'low',
        })}>{item.dueDate}</div>
        <div className="flex flex-row gap-2" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',                       
            })}/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',
            'fill-priority-inactive': item.level === 1          
            })}/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 6H20C22.2091 6 24 7.79086 24 10V14.5714C24 16.465 22.465 18 20.5714 18H12C5.37258 18 0 12.6274 0 6Z" 
          className={clsx({
            'fill-priority-high': item.priority === 'high',
            'fill-priority-medium': item.priority === 'medium',
            'fill-priority-low': item.priority === 'low',
            '!fill-priority-inactive': item.level === 1 || item.level === 2,            
            })}/>
          </svg>
        </div>
      </div>  
      <div>{item.author}</div>
      
        <button
            className="text-white bg-blue-800 p-2"
            onClick={() => handleComplete(item.id)}
          >
            체크
          </button>
          <button
        className="text-white bg-red-500 p-2"
        onClick={() => handleDelete(item.id)}
      >
        삭제
      </button>
         
    </div>
  </div>
  )}
</div>
  )
}