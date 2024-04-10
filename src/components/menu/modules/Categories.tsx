import { useState } from "react"
import { ICategories } from "../../../redux/types/common"
import { AddOrEditCategory } from "./AddOrEditCategory"
import Avatar from "react-avatar"
import { MdDeleteForever } from "react-icons/md";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import { useAppSelector } from "../../../redux/store";
import { PostCategoryApi } from "../../../services/apis/apis";
import { toast } from "react-toastify";

export function Categories({
    searchData
}: {
    searchData: ICategories[]
}) {
    const [loading, setLoading] = useState(false)
    const [isDeleteCategory, setISDeleteCategory] = useState(false)
    const [categoryId, setCategoryId] = useState(-1)
    const [isAvailabilityToggle, setIsAvailabilityToggle] = useState(false)

    function handleDeleteModal(category_id: number) {
        setISDeleteCategory(true);
        setCategoryId(category_id)
    }

    
    async function handelDeleteFunction() {
        const category = searchData.find((cat) => cat.category_id === categoryId)
        try {
            setLoading(true);
            const payload = {
                category_id: category?.category_id || -1,
                name: category?.name || '',
                is_active: false,
                is_disabled: false,
                is_new: true
            }
            const response = await PostCategoryApi(payload);
            if (response.status === 'success') {
                toast.success('Category deleted successfully');
                setCategoryId(-1);
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
                isShow={isDeleteCategory}
                onClose={() => {
                    setISDeleteCategory(false);
                }}
                text={{
                    cancel: 'Cancel',
                    confirm: 'Remove',
                    description: 'Are you sure you want to Remove this Category?',
                    title: 'Remove Category',
                    warningText: 'This action cannot be undone',
                }}
                className={{
                    cancelBtn: 'bg-gray-600 dark:bg-gray-600 text-gray-50 px-6 py-2 rounded-xl shadow-2xl hover:bg-gray-900 dark:hover:bg-gray-900',
                    confirmBtn: 'bg-red-600 text-gray-50 px-6 py-2 rounded-xl shadow-2xl hover:bg-red-700',
                }}
            />

            <div className="characters flex flex-col gap-3" >
                {
                    searchData.map((data, index) => (

                        <div

                            className="border-2 py-2.5  pl-2 border-black rounded-xl flex items-center md:justify-between gap-1 md:gap-3 w-full md:pr-2 bg-white relative"
                        >
                            <div className="flex flex-col md:flex-row gap-1 md:gap-3 w-full h-full">
                                <div
                                    className={`flex justify-center items-center w-full md:w-44 shrink-0 rounded-t-xl md:rounded-l-[11px] md:rounded-tr-none`}
                                >
                                    <div className="relative w-full overflow-hidden">
                                        <Avatar name={data.name} size="50" className="bg-black flex items-center justify-center " />

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
                                            <p className="text-2xl font-semibold pb-1">{data.name}</p>

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
                                            <AddOrEditCategory is_edit={true} data={data} />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteModal(data.category_id ?? -1)}
                                                className="bg-[#EE3232] rounded-full w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer"
                                            >
                                                <MdDeleteForever />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}