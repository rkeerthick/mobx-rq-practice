import './Post.scss'

type IPost = {
  title: string,
  body: string
}

const Post = ({title, body}: IPost) => {
  return (
    <div className="post">
        <div className="post__container">
          <div className="post__container__header">
            <button>Edit</button>
            <button>Delete</button>
          </div>
            <h2>{title}</h2>
            <h4>{body}</h4>
        </div>
    </div>
  )
}

export default Post