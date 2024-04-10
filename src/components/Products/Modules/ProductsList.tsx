import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../redux/store"
import { useEffect, useState } from "react";
import { ICategories } from "../../../redux/types/common";
import { AddToCartButton } from "./AddToCartButton";
import { FaRupeeSign } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
export function ProductList() {
    const params = useParams();
    const selectMenu = useAppSelector((state) => state.menu)
    const [selectCategory, setSelectCategory] = useState<ICategories | null>(null)
    useEffect(() => {
        const category = selectMenu.categories.find((category) => category.category_id === Number(params.id))
        if (category)
            setSelectCategory(category)
    }, [params.id, selectMenu.categories])
    return (
        <>

            <div className="pb-16">
                <div className="flex justify-center items-center">
                    <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                        <div className="flex flex-col jusitfy-center items-center space-y-10">
                            <div className="flex flex-col justify-center items-center space-y-2">
                                <p className="text-2xl leading-5 text-gray-600 font-semibold underline ">{selectCategory?.name}</p>
                                <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">Shop By Products</h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 md:gap-x-8 w-full">
                                {selectCategory?.products_id?.length ? selectCategory?.products_id.map((p_id) => {
                                    const product = selectMenu.products.find((product) => product.product_id === p_id)
                                    return (<div className="relative group flex justify-center rounded-lg items-center h-full w-full bg-gray-600 min-h-40">
                                        <div className=" font-semibold text-xl flex justify-center items-center gap-2">

                                        <p>{product?.name} </p>
                                        <span className=" flex  items-center">{product?.price} <FaRupeeSign size={15}/></span>                                        </div>
                                        <AddToCartButton
                                            category_id={Number(selectCategory?.category_id) || 0}
                                            product_id={Number(product?.product_id) || 0}
                                            name={product?.name || ''}
                                            price={product?.price || 0}

                                        />
                                    </div>)
                                }) : <></>}

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}