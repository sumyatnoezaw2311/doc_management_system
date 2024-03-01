import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppSnackbar = (type,message) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
