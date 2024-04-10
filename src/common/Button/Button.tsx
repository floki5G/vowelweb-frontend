import React from "react"

export function Button({
    name, callback, icon
}: {
    name: string,
    icon?: React.ReactNode,
    callback: () => void
}) {
    return (
        <>
            <button
                onClick={callback}
                type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-black-800  ">
                {name}
                {!!icon && <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-black bg-blue-200 rounded-full">
                    {icon}
                </span>}
            </button>
        </>
    )
}