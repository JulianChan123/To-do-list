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
        <div>
            <form onSubmit={onSubmit}>
                <input 
                type="text" 
                placeholder="Title"
                {...register("title", {required : true})} 
                />
                {errors.title && <span>Este campo es requerido</span>}
                <textarea 
                rows="3" 
                placeholder="Description"
                {...register("description", {required : true})} 
                ></textarea>
                {errors.descriptionxc && <span>Este campo es requerido</span>}
                <button>Save</button>
            </form>

            {params.id && <button onClick={async ()=>{
                const accepted = window.confirm("Are you sure?")
                if (accepted){
                    await deleteTask(params.id)
                    toast.success('Task succesfully deleted')
                    navigate("/tasks")
                }
            }}>Delete</button>}
        </div>
    )
}