import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-yellow-400 shadow-md'>

        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={'/'}>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-stone-500'>
                Leo
            </span>
            <span className='text-stone-900'>
            RealEstate
            </span>
        </h1>
        </Link>
        <form className='bg-stone-100 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-stone-600' />
        </form>
        <ul className="flex gap-4">
            <Link to={'/'} >
            <li className="hidden sm:inline text-stone-600 hover:text-stone-950 cursor-pointer">Home</li>
            </Link>
            <Link to={'/about'} >
            <li className="hidden sm:inline text-stone-600 hover:text-stone-950 cursor-pointer">About</li>
            </Link>
            <Link to={'/profile'} >
            {currentUser ? (<img src={currentUser.avatar} alt='profile' className='rounded-full h-7 w-7 object-cover' />):<li className=" text-stone-600 hover:text-stone-950 cursor-pointer">Sign-In</li>}
            </Link>
        </ul>
        </div>
       
    </header>
  )
}

export default Header