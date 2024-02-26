import { Link, Outlet } from "react-router-dom"
import Otp from '../pages/Nested/Otp'

function AdminLog() {
  return (
  <div className="flex">
    <div className="max-w-min h-screen bg-yellow-100">
        <ul>
        <Link to={''}>
            <li className="text-slate-800 hover:underline p-3 font-semibold cursor-pointer">
                chart
            </li>
        </Link>
        <Link to={'users'}>
        <li className="text-slate-800 hover:underline p-3 font-semibold cursor-pointer">
                Users
            </li>
        </Link>
        
        <Link to={'otp'}>
            <li className="text-slate-800 hover:underline p-3 font-semibold cursor-pointer">
                OTP
            </li>
        </Link>
        <Link to={'meetingtable'}>
            <li className="text-slate-800 hover:underline p-3 font-semibold cursor-pointer">
                Meeting 
            </li>
        </Link>
        </ul>
    </div>

    {<Outlet/> ? <div className="">
        <Outlet />
    </div> :<div className="">
        <Otp />
    </div>}
  </div>
  )
}

export default AdminLog