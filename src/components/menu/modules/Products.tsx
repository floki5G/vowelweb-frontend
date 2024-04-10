

import { useState } from "react"
import { ICategories, IProducts } from "../../../redux/types/common"
import Avatar from "react-avatar"
import { MdDeleteForever } from "react-icons/md";
import { AddNewOrEditProduct } from "./AddNewOrEditProduct"
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import { postProductApi } from "../../../services/apis/apis";
import { toast } from "react-toastify";

export function Products({
    categories,
    products
}: {
    categories: ICategories[],
    products: IProducts[]
}) {
    const [loading, setLoading] = useState(false)
    const [isDeleteProduct, setISDeleteProduct] = useState(false)
    const [sectionId, setSectionId] = useState(-1)
    const [selectProductId, setSelectProductId] = useState(-1)

    function handleDeleteModal(
        id: number,
        category_id: number
    ) {
        console.log('delete')

        setISDeleteProduct(true);
        setSelectProductId(id)
        setSectionId(category_id)
    }

    async function handelDeleteFunction() {
        const product = products.find((cat) => cat.product_id === Number(selectProductId))
        try {
            setLoading(true);
            const payload = {
                category_id: sectionId,
                product_id: product?.product_id,
                name: product?.name || '',
                price: Number(product?.price) || 0,
                is_active: false,
                is_disabled: Boolean(product?.is_disabled),
            }
            const response = await postProductApi(payload);
            if (response.status === 'success') {
                toast.success('Product deleted successfully');
                setSectionId(-1)
                setSelectProductId(-1)
            } else {
                toast.error('Something went wrong');
            }
        } catch (err) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <ConfirmationModal
                action={() => handelDeleteFunction()}
                isShow={isDeleteProduct}
                onClose={() => {
                    setISDeleteProduct(false);
                }}
                text={{
                    cancel: 'Cancel',
                    confirm: 'Remove',
                    description: 'Are you sure you want to Remove this Product?',
                    title: 'Remove Product',
                    warningText: 'This action cannot be undone',
                }}
                className={{
                    cancelBtn: 'bg-gray-600 dark:bg-gray-600 text-gray-50 px-6 py-2 rounded-xl shadow-2xl hover:bg-gray-900 dark:hover:bg-gray-900',
                    confirmBtn: 'bg-red-600 text-gray-50 px-6 py-2 rounded-xl shadow-2xl hover:bg-red-700',
                }}
            />
            <div className="characters flex flex-col gap-3" >
                {
                    categories.map((data, index) => (
                        <div>
                            <p className=" text-3xl font-semibold py-2 ">{data.name}</p>
                            {
                                data?.products_id?.length ? data?.products_id.map((product_id) => {

                                    const product = products.find((p) => p.product_id === (product_id))
                                    return (
                                        <>
                                            {
                                                product ?

                                                    <div

                                                        className="border-2 py-2.5  pl-2 border-black rounded-xl flex items-center md:justify-between gap-1 md:gap-3 w-full md:pr-2 bg-white relative mb-2"
                                                    >
                                                        <div className="flex flex-col md:flex-row gap-1 md:gap-3 w-full h-full">
                                                            <div
                                                                className={`flex justify-center items-center w-full md:w-44 shrink-0 rounded-t-xl md:rounded-l-[11px] md:rounded-tr-none`}
                                                            >
                                                                <div className="relative w-full overflow-hidden">
                                                                    <Avatar name={product.name} size="50" className="bg-black flex items-center justify-center " />

                                                                </div>



                                                            </div>

                                                            <div className="px-2 pb-2 md:pb-0">
                                                                <>
                                                                    <div
                                                                        id="description-toggle"
                                                                        className={`flex w-full justify-start items-center py-2 gap-2 text-left text-sm font-medium`}
                                                                    >
                                                                        <span className="">
                                                                            <p className="text-xl font-bold "></p>
                                                                        </span>
                                                                    </div>

                                                                    <div className={`text-sm`}>
                                                                        <p className="text-2xl font-semibold pb-1">{product.name}</p>

                                                                    </div>
                                                                </>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 absolute right-3 top-3 md:top-0 md:relative">
                                                            {/* <div className="bg-black rounded-full w-12 h-8 flex items-center justify-center">
                                                            <label htmlFor={`category-${data.category_id}`} className="">
                                                                <div className="relative">
                                                                    <input
                                                                        id={`category-${data.category_id}`}
                                                                        type="checkbox"
                                                                        className="hidden peer"
                                                                        checked={h}
                                                                        onChange={(e) => handleAvailabilityToggle(data.category_id ?? -1, e.target.checked)}
                                                                    />
                        
                                                                    <div className="w-7 h-4 rounded-full shadow-inner text-sm border-2 peer-checked:border-none peer-checked:border-black peer-checked:bg-[#3CC130]" />
                        
                                                                    <div className="absolute inset-y-0 left-0 w-2.5 h-2.5 m-[3px] shrink-0 grow-0 rounded-full shadow peer-checked:right-0 peer-checked:left-auto text-sm bg-white" />
                                                                </div>
                                                            </label>
                                                        </div> */}

                                                            <div className=" text-right">
                                                                <div className="w-full">
                                                                    <div className="flex gap-2 justify-between">
                                                                        <AddNewOrEditProduct is_edit={true} data={product} category_id={data.category_id} />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleDeleteModal(product.product_id ?? -1, data.category_id ?? -1)}
                                                                            className="bg-[#EE3232] rounded-full w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer"
                                                                        >
                                                                            <MdDeleteForever />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : <></>}
                                        </>
                                    )
                                })
                                    : <></>
                            }

                        </div>
                    ))
                }
            </div>
        </>
    )
}