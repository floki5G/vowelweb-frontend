import { useEffect, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { Input } from "../../../common/Input/Input";
import Sidebar from "../../../common/Sidebar/Sidebar";
import { PostCategoryApi } from "../../../services/apis/apis";
import { Toggle } from "../../../common/Toggle/Toggle";
import { toast } from "react-toastify";
import { ICategories } from "../../../redux/types/common";
import { MdEdit } from "react-icons/md";

export function AddOrEditCategory({
    is_edit,
    data
}: {
    is_edit?: boolean,
    data?: ICategories
}) {
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const handelAddCategory = async () => {
        try {
            setLoading(true);
            const payload = {
                category_id: is_edit ? data?.category_id : undefined,
                name: categoryName,
                is_active: Boolean(isActive),
                is_disabled: Boolean(isDisabled),
                is_new: Boolean(isNew)
            }
            const response = await PostCategoryApi(payload);
            if (response.status === 'success') {
                toast.success('Category added successfully');
            } else {
                toast.error('Something went wrong');
            }
        } catch (err) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (is_edit && data) {
            setCategoryName(data.name);
            setIsActive(data.is_active);
            setIsDisabled(data.is_disabled);
            setIsNew(data.is_new);
        }
    }, [data, is_edit])

    return (
        <>
            <Sidebar
                triggerText={
                    <>
                        <button className="ml-3 hidden fixed bottom-20 right-3 md:relative md:bottom-auto text-white font-semibold md:flex items-center justify-center bg-black px-3 py-[6.8px] rounded-lg whitespace-nowrap text-sm ">
                            {is_edit ? <MdEdit /> : ' Add Category'}
                        </button>
                    </>
                }
                heading='Add new Categories'
                actionBtn={<Button name="Save" callback={handelAddCategory} />}
            >
                <div>

                    <Input
                        id="category"
                        placeholder="Category"
                        type="text"
                        name="Category"
                        callback={(value) => setCategoryName(value)}
                        value={categoryName}
                    />
                    <Toggle enabled={isActive} setEnabled={setIsActive} name={'is active'} />
                    <Toggle enabled={isDisabled} setEnabled={setIsDisabled} name={'is disabled'} />
                    <Toggle enabled={isNew} setEnabled={setIsNew} name={'is new'} />

                </div>

            </Sidebar>

        </>
    )
}