import Avatar from "react-avatar";
import { useAppSelector } from "../../../redux/store";

export function CategoriesList() {
  const selectMenu = useAppSelector((state) => state.menu);
  return (
    <>
      <div className="pb-16">
        <div className="flex justify-center items-center">
          <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
            <div className="flex flex-col jusitfy-center items-center space-y-10">
              <div className="flex flex-col justify-center items-center space-y-2">
                <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                  Shop By Category
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 md:gap-x-8 w-full">
                {selectMenu.categories.map((category) => {
                  return (
                    <div className="relative group flex justify-center items-center h-full w-full bg-gray-600 min-h-36 rounded-md">
                      <div className="  absolute top-6  ">
                        <Avatar name={category.name} round='10' size="50" />
                      </div>
                      <a
                        href={`/products/${category.category_id}`}
                        className=" flex items-center justify-center bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                      >
                        {category.name}
                      </a>
                      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
