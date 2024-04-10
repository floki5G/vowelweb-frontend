import { useState } from "react";
import { Button } from "../Button/Button";
import PopUp from "../PopUp/PopUp";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  updateAddProductToCart,
  updateReduceProductFromCart,
} from "../../redux/slices/cart";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export function CartPopup() {
  const naviage = useNavigate();
  const [isCartPopup, setIsCartPopup] = useState(false);
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  function handelPlaceOrder() {
  naviage("/checkout");
  }
  return (
    <>
      <PopUp
        shown={isCartPopup}
        close={() => {
          setIsCartPopup(false);
        }}
      >
        <div className=" py-6 px-4">
          <div className=" w-full text-center text-2xl font-semibold">
            Your Cart
          </div>
          <div className=" pt-4 border-b-2 ">
            {Object.values(cartData.items).map((cartItem) => (
              <div>
                <div className=" font-medium flex w-full items-center  justify-between p-1.5">
                  <div className="w-6/12 ">
                    <p className="p-0 m-0 text-base lg:text-sm xl:text-base font-semibold">
                      {cartItem.name ?? ""}
                    </p>
                  </div>
                  <div className=" flex items-center justify-between w-6/12   gap-2  ">
                    <p
                      className={`flex items-center font-semibold text-black `}
                    >
                      {cartItem.price} <FaRupeeSign/>
                    </p>
                    <div className="w-5/12 flex items-center justify-between gap-1  px-2 rounded-md bg-black">
                      <button
                        type="button"
                        id="cartremove"
                        onClick={() =>
                          dispatch(
                            updateReduceProductFromCart({
                              cart_id: cartItem.cart_id,
                            })
                          )
                        }
                        className="text-sm flex items-center justify-center rounded-md text-white p-[3px]"
                      >
                        <FaMinus />
                      </button>

                      <span
                        id="carticonremove"
                        className="text-lg lg:text-base xl:text-lg font-semibold text-white"
                      >
                        {cartItem?.quantity}
                      </span>

                      <button
                        className="text-sm  flex items-center justify-center rounded-md text-white p-[3px]"
                        id="cartadd"
                        type="button"
                        onClick={() => {
                          dispatch(
                            updateAddProductToCart({
                              cart_id: cartItem.cart_id,
                            })
                          );
                        }}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="  py-4 flex  justify-between items-center font-semibold text-2xl">
            <p>Total</p>
            <p className=" flex items-center">{cartData.cartCost} <FaRupeeSign/></p>
          </div>
          <div className=" text-center">
            <Button
              name="Place Order"
              callback={() => {
                handelPlaceOrder();
              }}
            />
          </div>
        </div>
      </PopUp>
      <button
                onClick={()=>setIsCartPopup(true)}
                type="button" className="inline-flex gap-4 items-center px-5 py-2 text-2xl font-medium text-center bg-black text-white rounded-lg  ">
                <FaShoppingCart/> <span className=" w-8 flex justify-center items-center h-8 bg-white  text-black rounded-full">{Object.keys(cartData.items).length}</span> <span className=" flex items-center">{cartData.cartCost} <FaRupeeSign size={15}/></span>
           
            </button>    </>
  );
}
