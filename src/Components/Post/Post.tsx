import './Post.scss'

type IPost = {
  title: string,
  content: string
}

const Post = ({title, content}: IPost) => {
  return (
    <div className="post">
        <div className="post__container">
          <div className="post__container__header">
            <button>Edit</button>
            <button>Delete</button>
          </div>
            <h2>{title}</h2>
            <h4>{content}</h4>
        </div>
    </div>
  )
}

export default Post