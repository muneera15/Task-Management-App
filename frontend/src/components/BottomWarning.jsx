import { Link } from "react-router-dom"

export const BottomWarning=({label, link, to}) =>{
    return <div className="py-2 text-fuchsia-900 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline text-blue-800 pl-1 cursor-pointer" to={to}>
        {link}
      </Link>
    </div>
}