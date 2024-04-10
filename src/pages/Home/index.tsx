import { useEffect } from "react";
import { HomeComponent } from "../../components/Home";
import { LayoutManager } from "../../components/LayoutManager";
import { useAppDispatch } from "../../redux/store";
import { updateMenuData } from "../../redux/slices/menu";
import { getMenuApi } from "../../services/apis/apis";

export function Home() {
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
<HomeComponent/>
        </LayoutManager>

    )
}