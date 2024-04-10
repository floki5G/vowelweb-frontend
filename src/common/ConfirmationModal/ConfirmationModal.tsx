// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';
import {Dialog} from '@headlessui/react';
import Loader from '../Loader/Loader';
import PopUp from '../PopUp/PopUp';

interface IConfirmationModalProps {
  action: () => void;
  isShow: boolean;
  onClose: () => void;
  text: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
    warningText?: string;
  };
  className?: {
    cancelBtn?: string;
    confirmBtn?: string;
  };
  isLoading?: boolean;
}

const ConfirmationModal = ({action, isShow, onClose, text, className, isLoading}: IConfirmationModalProps) => {
  return (
    <PopUp shown={isShow} close={()=>onClose()}>
      <div className="w-[500px] max-h-[400px] transform overflow-hidden rounded-2xl bg-white mx-3 p-4 md:p-5 text-left shadow-xl transition-all">
        <div className="w-full h-full flex flex-col ">
          <div>
            <h1 className="font-semibold pb-3 border-b border-black text-lg">{text.title}</h1>
            <p className="pt-3 pb-1 font-semibold">{text.description}</p>

            {text.warningText && (
              <div className="pb-4">
                <p className="text-sm italic">{text.warningText}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              className={classNames(
                `bg-red-500 hover:bg-red-600 transition-all duration-150 text-white px-4 py-2 rounded-md outline-none`,
                className?.cancelBtn || '',
              )}
              onClick={onClose}
            >
              {text.cancel}
            </button>

            <button
              type="button"
              className={classNames(
                `bg-gray-400 hover:bg-gray-500 transition-all duration-150 text-white px-4 py-2 rounded-md min-w-[100px] outline-none`,
                className?.confirmBtn || '',
              )}
              onClick={action}
            >
              {isLoading ? <Loader /> : text.confirm}
            </button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default ConfirmationModal;
