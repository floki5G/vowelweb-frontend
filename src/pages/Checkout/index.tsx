import { CheckoutComponent } from "../../components/Checkout";
import { LayoutManager } from "../../components/LayoutManager";

export function Checkout() {
    return (
        <LayoutManager>
            <div>
                <CheckoutComponent />
            </div>
        </LayoutManager>
    )
}