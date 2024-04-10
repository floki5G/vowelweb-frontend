import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation } from 'react-router-dom';

type Props = {
  heading: string;
  children: JSX.Element;
  actionBtn?: JSX.Element;
  triggerText?: JSX.Element;
  id?: string;
  onCloseSidebar?: boolean;
  callbackForClose?: () => void;
  openId?: string;
  descripiton?: string | React.ReactNode;
  arrowCss?: string;
  onClose?: () => void;
};

export default function Sidebar({
  heading,
  children,
  triggerText,
  actionBtn,
  id,
  onCloseSidebar,
  callbackForClose,
  openId,
  descripiton,
  arrowCss,
  onClose,
}: Props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // ? Close the sidebare when onCloseSidebar is called
  useEffect(() => {
    if (onCloseSidebar) {
      setOpen(false);
    }

    if (!open && callbackForClose) {
      console.log('callbackForClose');

      callbackForClose();
    }
  }, [callbackForClose, onCloseSidebar, open]);

  // ? If the query tab contains sign make them auto scroll to the bottom of the page
  useEffect(() => {
    // ? Get the url params of tab using location.search
    const urlParams = new URLSearchParams(location.search);

    const timeout = setTimeout(() => {
      if (urlParams.get('tab') === 'payment-settings') {
        if (id === 'payment-settings-card') {
          setOpen(true);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, location.search]);

  return (
    <div className={`w-full  ${arrowCss ? arrowCss : 'flex justify-center text-black'}`}>
      {triggerText ? (
        <button
          className="w-full flex justify-center cursor-pointer hover:text-black"
          id={openId ? openId : undefined}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {triggerText}
        </button>
      ) : (
        <button
          onClick={() => {
            setOpen(!open);
          }}
          id="open-sidebar"
        >
          <i className="fa-solid fa-arrow-right "></i>
        </button>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen(false);
            if (onClose) {
              setTimeout(() => {
                onClose();
              }, 500);
            }
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-screen-3xl pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-3xl">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4"></div>
                    </Transition.Child>

                    <div className="flex h-full flex-col overflow-y-scroll bg-white pb-4 md:py-4 shadow-xl" id={id}>
                      <div className="px-4 sm:px-6 shadow-lg md:shadow-none pt-4 pb-2.5 md:pb-0 md:pt-0 sticky top-0 md:static z-10 bg-white">
                        <div className="flex flex-row justify-start md:justify-between gap-3 items-center">
                          <div className="">
                            <button
                              type="button"
                              id="close-sidebar"
                              className="rounded-md text-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => {
                                setOpen(false);
                                if (onClose) {
                                  setTimeout(() => {
                                    onClose();
                                  }, 500);
                                }
                              }}
                            >
                              <span className=" md:block hidden icon-clear text-2xl md:text-4xl text-black"></span>
                              <span className=" block md:hidden icon-arrow-left  text-lg  text-black"></span>
                            </button>
                          </div>

                          <div className="flex flex-col justify-center items-center">
                            <Dialog.Title className="text-base md:text-2xl font-bold text-black w-full text-center -mt-0.5 md:-mt-0">
                              {heading}
                            </Dialog.Title>

                            {descripiton && (
                              <Dialog.Description className=" text-gray-500 ml-2 text-center text-sm w-full">
                                {descripiton}
                              </Dialog.Description>
                            )}
                          </div>

                          <div className='ml-auto md:ml-0'>
                            {actionBtn ? actionBtn : <div />}
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-3 flex-1 px-4 sm:px-6">
                        <div className="absolute inset-0 px-4 pb-3 sm:px-6">{children}</div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
