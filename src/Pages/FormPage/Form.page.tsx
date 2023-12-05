import "./Form.scss";
import { observer } from "mobx-react-lite";
import AddUpdatePostContainer from "../../Containers/AddUpdatePostContainer/AddUpdatePostContainer";
import FormContainer from "../../Containers/FormContainer/FormContainer";
import { useEffect, useState } from "react";
import { setState } from "../../Constant/functions";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersByEmail } from "../../utils/functions";
import useStore from "../../Hooks/UseStore";

const Form = observer(() => {
  const {
    rootStore: { loginStore },
  } = useStore();

  const email = loginStore?.getLoginUser
  const userID = loginStore?.getUserID

  const [path, setPath] = useState("");
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setState(setPath, window.location.href.split("/")[3]);
    setState(setId, window.location.href.split("/")[4]);
    // setPath(window.location.href.split('/')[3]);
    // setId(window.location.href.split('/')[4]);
  }, [path, id]);

  if (path === "login") {
    return <FormContainer formType={path} />;
  } else if (path === "signup") {
    return <FormContainer formType={path} />;
  } else if (id === undefined) {
    return <AddUpdatePostContainer userID={userID} />;
  } else {
    return <AddUpdatePostContainer userID={userID} />;
  }
});

export default Form;
