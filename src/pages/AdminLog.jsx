import { Link, Outlet } from "react-router-dom"

function AdminLog() {
  return (
  <div className="flex">
    <div className="max-w-min h-screen bg-yellow-100">
        <ul>
        <Link to={'users'}>
        <li className="text-slate-800 hover:underline p-3 font-semibold cursor-pointer">
                Users
            </li>
        </Link>
        <Link to={'charts'}>
            <li className="text-slate-800 hover:underline p-3 font-semibold cursor-pointer">
                chart
            </li>
        </Link>
        <Link to={'otp'}>
            <li className="text-slate-800 hover:underline p-3 font-semibold cursor-pointer">
                OTP
            </li>
        </Link>
        </ul>
    </div>
    <div className="">
        <Outlet />
    </div>
  </div>
  )
}

export default AdminLog