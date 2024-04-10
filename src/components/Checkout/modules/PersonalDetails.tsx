import Avatar from "react-avatar"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { updateCheckoutDetails } from "../../../redux/slices/checkout"

import RenderRazorpay from "../../RenderRazorpay/RenderRazorpay"
import { useState } from "react"

export function PersonalDetails() {
    const [loading, setLoading] = useState(false)
    const cartData = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const checkoutData = useAppSelector((state) => state.checkout)
    const payload = {
        amount: cartData.cartCost * 100,
        first_name: checkoutData.firstName || '',
        last_name: checkoutData.lastName,
        email: checkoutData.email,
        phone_no: checkoutData.phone,
        shipping_address: checkoutData.address_line,

        address_line: checkoutData.address_line,
        city: checkoutData.city,
        state: checkoutData.state,
        zipcode: checkoutData.postal_code
    }
    return (
        <div>

            <div className="font-[sans-serif] bg-gray-50">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
                    <div className="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0">
                        <div className="relative h-full">
                            <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
                                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                                <div className="space-y-6 mt-10">
                                    {
                                        Object.values(cartData.items).map((cartItem) => (
                                            <div className="grid sm:grid-cols-2 items-start gap-6">
                                                <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md">
                                                    {/* <img src='https://readymadeui.com/images/product10.webp' className="w-full object-contain" /> */}
                                                    <Avatar name={cartItem.name} size="50" className="bg-black flex items-center justify-center " />
                                                </div>
                                                <div>
                                                    <h3 className="text-base text-white">{cartItem.name}</h3>
                                                    <ul className="text-xs text-white space-y-3 mt-4">
                                                        {/* <li className="flex flex-wrap gap-4">Size <span className="ml-auto">37</span></li> */}
                                                        <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{cartItem.quantity}</span></li>
                                                        <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">{cartItem.price}</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}

                                </div>
                            </div>
                            <div className="absolute left-0 bottom-0 bg-[#444] w-full p-4">
                                <h4 className="flex flex-wrap gap-4 text-base text-white">Total <span className="ml-auto">{cartData.cartCost}</span></h4>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-2 h-max rounded-md p-8 sticky top-0">
                        <h2 className="text-2xl font-bold text-[#333]">Complete your order</h2>
                        <form className="mt-10">
                            <div>
                                <h3 className="text-lg font-bold text-[#333] mb-6">Personal Details</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="relative flex items-center">
                                        <input type="text" placeholder="First Name"
                                            value={checkoutData.firstName}
                                            onChange={(e) => dispatch(updateCheckoutDetails(
                                                { key: 'firstName', value: e.target.value }
                                            ))}
                                            className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4"
                                            viewBox="0 0 24 24">
                                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                            <path
                                                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                data-original="#000000"></path>
                                        </svg>
                                    </div>
                                    <div className="relative flex items-center">
                                        <input type="text" placeholder="Last Name"
                                            value={checkoutData.lastName}
                                            onChange={(e) => dispatch(updateCheckoutDetails(
                                                { key: 'lastName', value: e.target.value }
                                            ))}
                                            className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4"
                                            viewBox="0 0 24 24">
                                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                            <path
                                                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                data-original="#000000"></path>
                                        </svg>
                                    </div>
                                    <div className="relative flex items-center">
                                        <input type="email" placeholder="Email"
                                            value={checkoutData.email}
                                            onChange={(e) => dispatch(updateCheckoutDetails(
                                                { key: 'email', value: e.target.value }
                                            ))}
                                            className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4"
                                            viewBox="0 0 682.667 682.667">
                                            <defs>
                                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                                </clipPath>
                                            </defs>
                                            <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                                <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                    data-original="#000000"></path>
                                                <path
                                                    d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                    data-original="#000000"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="relative flex items-center">
                                        <input type="number" placeholder="Phone No."
                                            value={checkoutData.phone}
                                            onChange={(e) => dispatch(updateCheckoutDetails(
                                                { key: 'phone', value: e.target.value }
                                            ))}
                                            className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                        <svg fill="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 64 64">
                                            <path
                                                d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                                                data-original="#000000"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-[#333] mb-6">Shipping Address</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <input type="text" placeholder="Address Line"
                                        value={checkoutData.address_line}
                                        onChange={(e) => dispatch(updateCheckoutDetails(
                                            { key: 'address_line', value: e.target.value }
                                        ))}
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                    <input type="text" placeholder="City"
                                        value={checkoutData.city}
                                        onChange={(e) => dispatch(updateCheckoutDetails(
                                            { key: 'city', value: e.target.value }
                                        ))}
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                    <input type="text" placeholder="State"
                                        value={checkoutData.state}
                                        onChange={(e) => dispatch(updateCheckoutDetails(
                                            { key: 'state', value: e.target.value }
                                        ))}
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                    <input type="text" placeholder="Zip Code"
                                        value={checkoutData.postal_code}
                                        onChange={(e) => dispatch(updateCheckoutDetails(
                                            { key: 'postal_code', value: e.target.value }
                                        ))}

                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                </div>
                                <div className="flex gap-6 max-sm:flex-col mt-10">
                                    <button

                                        type="button" className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent  border-2 text-[#333]">Cancel</button>
                                    <button
                                        onClick={() => RenderRazorpay(payload,setLoading)}
                                        type="button" className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333]  text-white">{
                                        loading ? 'Loading...' : 'Proceed to Payment'
                                        }</button>



                                </div>

                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}