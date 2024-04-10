import { toast } from "react-toastify";
import { IOrder, PostOrderApi, PostPaymentCaptureApi } from "../../services/apis/apis";

function loadScript(src: string) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
async function RenderRazorpay(payload: IOrder, setLoading:
    React.Dispatch<React.SetStateAction<boolean>>
) {
    try {
        setLoading(true);
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            setLoading(false);
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const response = await PostOrderApi(payload)
        if (!response) {
            console.log('Order creation failed' );
            setLoading(false);
            return;
        }
        const { order_id } = response;
        const options = {
            key: "rzp_test_3tAiiSDYdPzpZy", // Enter the Key ID generated from the Dashboard
            amount: response.amount.toString(),
            currency: 'INR',
            name: payload.first_name + ' ' + payload.last_name,
            description: 'Test Transaction',
            // image: { logo },
            order_id: order_id,
            handler: async function (response: any) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await PostPaymentCaptureApi(data)

                if (result.status === 'success') {
                    toast.success(result.message + 'redirecting to menu');
                    window.location.href = '/';
                    localStorage.clear();
                }
                else toast.error(result.message);


            },
            prefill: {
                name: payload.first_name + ' ' + payload.last_name,
                email: payload.email,
                contact: payload.phone_no,
            },
            notes: {
                address: payload.address_line + ' ' + payload.city + ' ' + payload.state + ' ' + payload.zipcode,
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
        setLoading(false);

    } catch (e) {
        setLoading(false);
    } finally {
        setLoading(false);
    }

}


export default RenderRazorpay;