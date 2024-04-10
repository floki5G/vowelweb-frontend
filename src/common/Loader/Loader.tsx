interface ILoaderProps {
  theme?: 'light' | 'dark';
}

const Loader = ({ theme = 'dark' }: ILoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center ">
        <div className={`w-6 h-6 border-b-2 ${theme === 'dark' ? 'border-gray-900' : 'border-white'} rounded-full animate-spin`} />
      </div>
    </div>
  );
};

export default Loader;
