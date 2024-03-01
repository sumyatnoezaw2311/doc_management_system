import { HEADERS } from './config'

export const transform = async (src)=>{
    try {
      const response = await fetch(src, { headers: HEADERS() });
      const imageBlob = await response.blob();
  
      const result = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(imageBlob);
      });
      return result
    } catch (error) {
      console.error('Error fetching or converting image:', error);
      throw error;
    }
}
  