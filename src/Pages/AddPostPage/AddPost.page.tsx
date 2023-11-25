import "./AddPost.scss";
import { observer } from "mobx-react-lite";
import AddUpdatePostContainer from "../../Containers/AddUpdatePostContainer/AddUpdatePostContainer";
import FormContainer from "../../Containers/FormContainer/FormContainer";

const AddPost = observer(() => {
  const path = window.location.href.split('/')[3];
  const id = window.location.href.split('/')[4];
console.log(path, 'path')
  if(path === "login") {
    return <FormContainer formType={path} />
  }
  else if (path === "signup") {
    return <FormContainer formType={path} />
  }
  else if (id === undefined) {
    return <AddUpdatePostContainer id={0} /> 
  }
  else {
    return <AddUpdatePostContainer id={+id} /> 
  }
})

export default AddPost;
