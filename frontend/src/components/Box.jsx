export function Box({children}){
    return(
        <div className="border-2 border-black rounded-2xl p-12 flex flex-col justify-center items-center">
            {children}
        </div>
    )
}