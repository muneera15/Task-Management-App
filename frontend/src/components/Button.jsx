export const Button =({label, onClick}) =>{
    return <button onClick={onClick} type="button" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">{label}</button>
}