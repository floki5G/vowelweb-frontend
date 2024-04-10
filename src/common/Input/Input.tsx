
export function Input({
    id, placeholder, type, name,value,callback
}: {
    id: string,
    placeholder: string,
    type: string,
    name: string,
    value: string,
    callback: 
    (value: string) => void
}) {
    return (
        <>
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    {name}
                </label>
                <input 
                
                value={value}
                onChange={(e) => callback(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight " id={id} type={type} placeholder={placeholder} />
               {!value && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>

        </>
    )
}