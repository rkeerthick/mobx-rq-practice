import { createContext } from "react";
import { RootStore } from "./RootStore";


const rootStoreContext = createContext({
    rootStore: new RootStore()
 })
export default rootStoreContext;
