
import { useMutation } from 'react-query'
import { deletePost } from '../utils/functions'

const useDeletePost = () => {
    return useMutation(deletePost)
}

export default useDeletePost