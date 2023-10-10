import Login from './login'
import Link from 'next/link'
function Navbar() {
  return (
    <div className="navbar ">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          TellApp
        </Link>
      </div>
      <Login />
    </div>
  )
}

export default Navbar
