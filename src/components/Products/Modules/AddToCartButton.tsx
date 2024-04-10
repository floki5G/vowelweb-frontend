import { FaMinus, FaPlus } from "react-icons/fa"
import { updateAddProductToCart, updateReduceProductFromCart } from "../../../redux/slices/cart"
import { useAppDispatch, useAppSelector } from "../../../redux/store"

export function AddToCartButton({ category_id, product_id, name, price }: {
    category_id: number,
    product_id: number,
    name: string,
    price: number
}) {
    const dispatch = useAppDispatch()
    function handelAddToCart(state?: string) {
        if (state === 'reduce') {
            dispatch(updateReduceProductFromCart({
                cart_id: `${category_id}-${product_id}`
            }))
        } else {
            dispatch(updateAddProductToCart({
                category_id,
                product_id,
                name, price:Number(price),
                cart_id: `${category_id}-${product_id}`
            }))
        }
    }
    const cartData = useAppSelector((state) => state.cart)
    return (
        <>
            <div className="absolute  bottom-3  text-white" >

                {
                    cartData.items[`${category_id}-${product_id}`] ? (
                        <div
                            className="flex justify-between items-center  bg-black w-36 rounded-lg overflow-hidden"
                        >
                            <button
                                className=" py-2 px-4  bg-black text-white  flex justify-center items-center border border-r-2 border-gray-800 "
                                onClick={() => handelAddToCart('reduce')}
                            ><FaMinus/></button>
                            <p>{cartData.items[`${category_id}-${product_id}`].quantity}</p>
                            <button
                                className="py-2 px-4 bg-black text-white flex justify-center items-center border border-l-2 border-gray-800"
                                onClick={() => handelAddToCart('add')}
                            >
                                <FaPlus/>
                                
                            </button>
                        </div>
                    ) : <div>
                        <button
                            onClick={() => handelAddToCart()}
                            type="button"
                             className="text-white bg-black hover:bg-gray-900 w-36 font-medium text-sm px-5 py-2.5 me-2 mb-2 rounded-lg "
                             >Add to Cart</button>



                    </div>
                }
            </div>

        </>


    )
}