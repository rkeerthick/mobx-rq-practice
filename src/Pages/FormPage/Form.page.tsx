import "./Form.scss";
import { observer } from "mobx-react-lite";
import AddUpdatePostContainer from "../../Containers/AddUpdatePostContainer/AddUpdatePostContainer";
import FormContainer from "../../Containers/FormContainer/FormContainer";
import { useEffect, useState } from "react";
import { setState } from "../../Constant/functions";

const Form = observer(() => {
  const [path, setPath] = useState('');
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setState(setPath, window.location.href.split('/')[3]);
    setState(setId, window.location.href.split('/')[4]);
    // setPath(window.location.href.split('/')[3]);
    // setId(window.location.href.split('/')[4]);
  }, [path, id])

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

export default Form;
