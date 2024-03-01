import { AppSnackbar } from "../components/utils/AppSnackbar";
import { HEADERS } from "./config";
import Axios from 'axios'

export const downAtBlink = async (url,filename)=>{
    const { Authorization } = HEADERS()
    if (!url || !Authorization) {
      AppSnackbar('error', 'Failed, something went wrong')
      return;
    }
    const AxiosRequestConfig = {
      method: 'GET',
      url: url,
      responseType: 'arraybuffer',
      headers: {
        Authorization: Authorization,
      },
    };
  
    try {
      const response = await Axios(AxiosRequestConfig);
      const outputFilename = filename;
      const blob = new Blob([response.data]);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = outputFilename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(blobUrl);
      console.log('Successfully Downloaded');
    } catch (error) {
      console.log("error is occuring");
    }
}