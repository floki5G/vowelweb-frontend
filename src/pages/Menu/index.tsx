import { useEffect } from "react"
import { LayoutManager } from "../../components/LayoutManager"
import { MenuComponent } from "../../components/menu"
import { getMenuApi } from "../../services/apis/apis";
import { useAppDispatch } from "../../redux/store";
import { updateMenuData } from "../../redux/slices/menu";

export function Menu() {
// ? call getMenuApi() here
const dispatch = useAppDispatch();

    useEffect(() => {
        getMenu()
        async function getMenu() {
            try {
                const response = await getMenuApi();
                if(response.status === 'success'){
                    dispatch(updateMenuData(response.data));
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    }, [])
    return (
        <LayoutManager>
            <div>
                <MenuComponent />
            </div>
        </LayoutManager>
    )
}