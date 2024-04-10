import { LayoutManager } from "../../components/LayoutManager"
import { MenuComponent } from "../../components/menu"

export function Menu() {
    return (
        <LayoutManager>
            <div>
                <MenuComponent />
            </div>
        </LayoutManager>
    )
}