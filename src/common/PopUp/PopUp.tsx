interface Props {
    children: any;
    shown: boolean;
    close: any;
    showCloseButton?: boolean
  }
  
  export default function PopUp({ children, shown, close, showCloseButton }: Props) {
    return shown ? (
      <div
        style={{ background: "rgba(0, 0, 0, 0.7)" }}
        className="bg-[#47474B] fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50"
        onClick={() => { }}
      >
        <div
          className="w-full mx-3 relative rounded-lg md:rounded-[10px] bg-white md:w-[60%] lg:w-[48%] xl:w-[35%]  max-h-[75%] overflow-auto "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
            <button
              type="button"
              className="rounded-md text-black w-7 h-7 bg-slate-300"
              onClick={() => close()}
            >
         X
            </button>
          </div>
          {children}
        </div>
      </div>
    ) : null;
  }
  