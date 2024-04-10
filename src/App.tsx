import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InternalPages from './router';
import { Provider } from 'react-redux';
import { makeStore } from './redux/store';

function App() {
  return (
    <Provider store={makeStore()}>
      <BrowserRouter>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          draggable={false}
          bodyClassName="px-4 flex gap-4"
        />

        <InternalPages />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
