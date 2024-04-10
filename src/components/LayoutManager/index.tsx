import { Navbar } from "../Navbar/Navbar";

export function LayoutManager({ children }:
    { children: React.ReactNode }) {
    return (
        <div>
            <Navbar/>
            <div className="p-4">{children}</div>
        </div>
    )
}