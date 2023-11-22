import './Post.scss'
import useDeletePost from '../../Hooks/useDeletePost'

type IPost = {
  id: string,
  title: string,
  content: string
}


const Post = ({id, title, content}: IPost) => {
  const { mutate } = useDeletePost();
  const deletePost = (id: string) => {
    console.log(id, 'delete id')
    mutate(id)
  }
  return (
    <div className="post">
        <div className="post__container">
          <div className="post__container__header">
            <button>Edit</button>
            <button type='button' onClick={() => deletePost(id)}>Delete</button>
          </div>
            <h2>{title}</h2>
            <h4>{content}</h4>
        </div>
    </div>
  )
}

export default Post