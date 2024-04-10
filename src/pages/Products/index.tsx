import { useEffect } from "react";
import { LayoutManager } from "../../components/LayoutManager";
import { ProductComponent } from "../../components/Products";
import { useAppDispatch } from "../../redux/store";
import { getMenuApi } from "../../services/apis/apis";
import { updateMenuData } from "../../redux/slices/menu";

export function Products() {
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
          <ProductComponent/>
        </LayoutManager>
    )
}











