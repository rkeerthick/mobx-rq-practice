
import { useMutation } from 'react-query';
import { addPost } from '../utils/functions';


const useAddPost = () => {
  return useMutation(addPost);
};


export default useAddPost