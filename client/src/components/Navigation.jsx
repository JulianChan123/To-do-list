import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export function Navigation() {
    
    const navigate = useNavigate();
    
    return(

        <div className='flex justify-between py-3'>
            <Link to ="/tasks">
                <h1 className='font-bold text-3xl mb-4'>Task App</h1>
            </Link>
            

            
            <div className="bg-indigo-500 px-3 py-2 rounded-lg hover:cursor-pointer" onClick={() =>{
                navigate('/tasks-create')
            }}>
                Create Task
            </div>

        </div>
    )
}