import React from 'react'

function AddSingleTask(props) {

    const HandlerDeleteTask = (id) => {
        //when match the item id and button id this is filter fun will not return this item;
        props.setTask(props.task.filter((item) => item.id !== id))
        localStorage.removeItem(id)
    }

    const HandlerEdit = (id) => {
        const toEdite = props.task.find((item) => item.id === id);
        props.setText(toEdite.text);
        props.setEditId(id);
    }
    return (
        <>
            {props.task.map((item) =>
                <div
                    key={item.id}
                    id={item.id}
                    className='border p-2 rounded-md text-gray-200 border-gray-400 flex justify-between text-lg bg-[#101828]'>
                    <div className='flex gap-3'>
                        <input
                            type="checkbox"
                            className='peer '
                            id={item.text}
                        />
                        <label
                            htmlFor={item.text}
                            className='peer-checked:line-through'>
                            {item.text}
                        </label>
                    </div>
                    <div className='space-x-5'>
                        <button
                            className='text-red-500 cursor-pointer '
                            onClick={() => HandlerEdit(item.id)}>
                            Edit
                        </button>
                        <button
                            className='cursor-pointer hover:bg-[#ff104f] px-2 rounded-md duration-500 transition-all'
                            onClick={() => HandlerDeleteTask(item.id)} >
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddSingleTask
