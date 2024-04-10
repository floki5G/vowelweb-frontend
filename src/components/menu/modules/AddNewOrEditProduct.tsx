import { useEffect, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { Input } from "../../../common/Input/Input";
import { postProductApi } from "../../../services/apis/apis";
import Sidebar from "../../../common/Sidebar/Sidebar";
import { Toggle } from "../../../common/Toggle/Toggle";
import { useAppSelector } from "../../../redux/store";
import { IProducts } from "../../../redux/types/common";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";


export function AddNewOrEditProduct(
    { is_edit,
        data ,category_id}: {
            is_edit?: boolean,
            data?: IProducts ,
            category_id?: number
        }
) {
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [sectionId, setSectionId] = useState<number>(-1);
    const [price, setPrice] = useState('');
    const selectMenu = useAppSelector((state) => state.menu);
    const [productName, setProductName] = useState('');
    const handelAddProduct = async () => {
        try {
            setLoading(true);
            const payload = {
                category_id: sectionId,
                product_id: is_edit ? data?.product_id : undefined,
                name: productName || '',
                price: Number(price) || 0,
                is_active: Boolean(isActive),
                is_disabled: Boolean(isDisabled),
            }
            const response = await postProductApi(payload);
            if (response.status === 'success') {
                toast.success('Product added successfully');
            } else {
                toast.error('Something went wrong');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (is_edit && data) {
            setProductName(data.name);
            setIsActive(data.is_active);
            setIsDisabled(data.is_disabled);
            setPrice(data.price.toString());
            if(category_id)setSectionId(category_id);
        }
    }, [category_id, data, is_edit])
    return (
        <>
            <Sidebar
                triggerText={
                    <>
                    <button className="ml-3 hidden fixed bottom-20 right-3 md:relative md:bottom-auto text-white font-semibold md:flex items-center justify-center bg-black px-3 py-[6.8px] rounded-lg whitespace-nowrap text-sm ">
                            {is_edit ? <MdEdit /> : ' Add Product'}
                        </button>
                    </>
                }
                heading='Add new Product'
                actionBtn={<Button name="Save" callback={handelAddProduct} />}
            >
                <div>

                    <Input
                        id="name"
                        placeholder="Name"
                        type="text"
                        name="Name"
                        value={productName}
                        callback={(value) => setProductName(value)}
                    />
                    <Input
                        id="price"
                        placeholder="Price"
                        type="number"
                        name="Price"
                        value={price.toString()}
                        callback={(value) => setPrice(value)}
                    />
                    <Toggle enabled={isActive} setEnabled={setIsActive} name={'is active'} />
                    <Toggle enabled={isDisabled} setEnabled={setIsDisabled} name={'is disabled'} />
                    <div className="w-full">
                        <label className="block text-sm font-bold text-gray-900 py-1 pt-1.5 ">Select Category</label>

                        <select
                            className="border-2 border-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5 text-black  text-base dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={sectionId || 0}
                            onChange={(e) => setSectionId(Number(e.target.value))}
                        >
                            <option defaultValue={''}>Select Category</option>

                            {selectMenu.categories.map((section) => {
                                return (
                                    <option key={section.category_id} value={section.category_id}>
                                        {section.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

            </Sidebar>
        </>
    )
}