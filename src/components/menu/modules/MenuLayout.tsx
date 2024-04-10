import { useState } from "react"
import { AddOrEditCategory } from "./AddOrEditCategory"
import { AddNewOrEditProduct } from "./AddNewOrEditProduct"
import { Categories } from "./Categories"
import { Products } from "./Products"
import { useAppSelector } from "../../../redux/store"

export function MenuLayout() {
  const [activeStatus, setActiveStatus] = useState(1)
 
const selectMenu = useAppSelector((state) => state.menu)
  return (
    <>

      <div className="w-full">
        <div className="pt-4">
          <div className="justify-between w-full gap-8 flex md:flex-row flex-col bg-white rounded ">
            <div className="w-full md:pl-1.5 overflow-x-scroll hide-scrollbar border-b border-[#DCDCDC] sm:border-b-0">
              <ul className="flex w-full shrink-0">
                <li
                  onClick={() => setActiveStatus(1)}
                  className={
                    activeStatus === 1
                      ? 'text-sm  flex flex-col justify-between rounded-t mr-7 font-bold'
                      : 'text-sm mr-7 text-[#5B5B5B] cursor-pointer font-semibold sm:border-b sm:border-[#DCDCDC]'
                  }
                >
                  <span className="mb-[5px] cursor-pointer whitespace-nowrap">
                    {activeStatus === 1 ? 'Categories' : 'Categories'}
                  </span>
                  {activeStatus === 1 && <div className="w-full h-1 bg-[#FFEE32] md:-mb-[1px]" />}
                </li>
                <li
                  onClick={() => setActiveStatus(2)}
                  className={
                    activeStatus === 2
                      ? 'text-sm  flex flex-col justify-between rounded-t mr-7 font-bold'
                      : 'text-sm mr-7 text-[#5B5B5B] cursor-pointer font-semibold sm:border-b sm:border-[#DCDCDC]'
                  }
                >
                  <span className="mb-[5px] cursor-pointer whitespace-nowrap">
                    {activeStatus === 2 ? 'Product' : 'Product'}
                  </span>
                  {activeStatus === 2 && <div className="w-full h-1 bg-[#FFEE32] md:-mb-[1px]" />}
                </li>

              </ul>
            </div>
            <div className="flex justify-end md:gap-3">
              {/* searchbar */}
              {/* <MenuSearch onChange={(value) => handleSearchOption(value)} activeTab={activeStatus} /> */}

              <div className="md:mr-3 md:relative bottom-14 md:bottom-0 left-2/3 md:left-0">
                <button className="flex items-center justify-center bg-black text-white rounded-lg whitespace-nowrap relative">
                  {activeStatus === 1 ? (
                    <AddOrEditCategory />
                  ) : activeStatus === 2 ? (
                    <AddNewOrEditProduct
                    />
                  ) : (
                    <AddOrEditCategory />
                  )}

                  <span className="absolute top-0 right-0 bottom-0 left-0 bg-black rounded-lg translate-y-1 z-[-1]" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full">
            {activeStatus === 2 ? (
              <Products categories={selectMenu.categories} products={selectMenu.products} />
            ) : activeStatus === 1 ? (
              
              <Categories searchData={selectMenu.categories} />
            ) : (
              <Categories searchData={selectMenu.categories} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}