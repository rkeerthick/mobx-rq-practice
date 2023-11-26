import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../utils/functions'

const useGetUsers = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUsers
  })
}

export default useGetUsers