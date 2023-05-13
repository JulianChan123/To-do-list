import {get, useForm} from 'react-hook-form'
import { createTask,deleteTask, getTask, updateTask } from '../api/tasks.api';
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {toast} from 'react-hot-toast' 

export function TasksFormPage() {

    const {
        register, 
        handleSubmit, 
        formState: { errors},
        setValue
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        if (params.id){
            updateTask(params.id, data);
            toast.success('Task succesfully updated')
        }else{
            await createTask(data);
            toast.success('Task succesfully created')
        }
        navigate('/tasks')
    })

    useEffect(() => {
        async function loadTask(){
            if(params.id){
                const {data} = await getTask(params.id);
                setValue('title', data.title)
                setValue('description', data.description)
            }
        }
        loadTask();
    }, []);

    return(
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input 
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                type="text" 
                placeholder="Title"
                {...register("title", {required : true})} 
                />
                {errors.title && <span>Este campo es requerido</span>}
                <textarea 
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'                
                rows="3" 
                placeholder="Description"
                {...register("description", {required : true})} 
                ></textarea>
                {errors.descriptionxc && <span>Este campo es requerido</span>}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-6'>Save</button>
            </form>

            {params.id && (
            <div className='flex justify-end'>

                <button 
                className='bg-red-500 p-3 rounded-lg block w-48 mt-3'
                onClick={async ()=>{
                    const accepted = window.confirm("Are you sure?")
                    if (accepted){
                        await deleteTask(params.id)
                        toast.success('Task succesfully deleted')
                        navigate("/tasks")
                    }
                }}>Delete</button>

            </div>
            )}
        </div>
    );
}