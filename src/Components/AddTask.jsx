import React, { useState } from 'react'
import ElectricBorder from './ElectricBorder'
import AddSingleTask from './AddSingleTask';
import LoadFromLocal from './LoadFromLocal';


export default function AddTask() {
  const [text, setText] = useState('');
  const [task, setTask] = useState([]);
  const [editId, setEditId] = useState(null);
  const [alart, setAlart] = useState("Enter Task");



  function HandlerOnChange(e) {
    setText(e.target.value);
  }

  function HandlerOnClick() {
    if (text.trim() === '') {
      document.querySelector("#textInput").classList.add("border-red-500", "border")
      return;
    }
    const dupCheck = checkDuplicate()
    if (dupCheck === undefined) {
      if (editId) {
        setTask(task.map(item => item.id === editId ? { ...item, text: text } : item));
        setEditId(null);
        localStorage.setItem(editId, text)
        setAlart("Enter Task");
      } else {
        // generate one id and reuse it so state and localStorage stay consistent
        const id = Date.now();
        setTask([...task, { text: text, id }]);
        localStorage.setItem(String(id), text);
        setAlart("Enter Task");
      }
      Cleartext();
    } else {
      setAlart("Task Alredy Exist");
    }

  }



  const checkDuplicate = () => {
    return (task.find((item) => item.text === text))
  }

  function Cleartext() {
    setText('');
  }
  return (
    <>
      <div className='lg:w-[40%] mx-auto mt-24 text-center pb-5 text-5xl  '><h1 className='text-white'>Task-Manager</h1></div>
      <ElectricBorder
        className="w-[95%] lg:w-[45%] mx-auto"
        color="#7df9ff"
        speed={0.5}
        chaos={0.5}
        thickness={2}
        style={{ borderRadius: 16 }}
      >
        <div className=' w-[90%] mx-auto p-4 text-white'>
          <div className='h-20'>
            <div className='flex justify-between w-full gap-5'>
              <div className='relative w-full'>
                <input
                  id='textInput'
                  onChange={HandlerOnChange}
                  type="text"
                  className='w-full peer  p-3 border border-gray-400 focus:outline-none duration-500 transition-all  rounded-md items-center focus:border-[#ff104f] '
                  value={text} onKeyDown={(e) => e.key === "Enter" && HandlerOnClick()}
                />
                <h1
                  className={`absolute top-3 left-2 ${text === '' && "peer-focus:-top-3"} ${text.length > 0 && "-translate-y-6"} duration-500 transition-all text-gray-300`}
                >{alart}</h1>
              </div>
              <button
                onClick={HandlerOnClick}
                className='w-[40%]  px-4 rounded-md border-gray-400 font-semibold text-lg text-gray-200 hover:text-white active:scale-85 bg-[#ff104f] duration-500 transition-all cursor-pointer'>
                {editId ? "Save" : "Add Task"}
              </button>
            </div>
          </div>

          <div className='flex gap-5 flex-col mt-5'>
            <AddSingleTask
              text={text} task={task} setTask={setTask} setText={setText} setEditId={setEditId}
            />
          </div>
        </div>
        <LoadFromLocal
          setTask={setTask}
        />
      </ElectricBorder>
      <h1 className='text-white  text-center '>Dev. By Md Asaduzzaman</h1>
    </>
  )
}
