import { OrderList } from "../../components/Dashboard/Modules/OrderList";
import { LayoutManager } from "../../components/LayoutManager";

export function Dashboard() {
    return (
        <LayoutManager>
            <div>
              <OrderList/>
            </div>
        </LayoutManager>
    )
}