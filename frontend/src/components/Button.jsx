export const Button =({label, onClick}) =>{
    return <button onClick={onClick} type="button" className="w-full text-white bg-rose-400 hover:bg-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5">{label}</button>
}