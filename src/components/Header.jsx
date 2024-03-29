import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function Header() {
    const {currentUser} = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
        // console.log(currentUser)
      }, [location.search]);
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
        <form onSubmit={handleSubmit} className='bg-stone-100 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <button><FaSearch className='text-stone-600' /></button>
        </form>
        <ul className="flex gap-4">
            {
                currentUser?.role==='admin' && (
                    <Link to={'/adminlog'}>
            <li className="  text-stone-600 hover:text-stone-950 cursor-pointer">Admin</li>
            </Link>
                )
            }
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