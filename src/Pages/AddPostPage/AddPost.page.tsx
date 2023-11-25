import "./AddPost.scss";
import { observer } from "mobx-react-lite";
import AddUpdatePostContainer from "../../Containers/AddUpdatePostContainer/AddUpdatePostContainer";
import FormContainer from "../../Containers/FormContainer/FormContainer";
import { useEffect, useState } from "react";

const AddPost = observer(() => {
  const [path, setPath] = useState('');
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log("effect ", path, ' , ', id)
    setPath(window.location.href.split('/')[3]);
    setId(window.location.href.split('/')[4]);
  }, [path, id])

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
