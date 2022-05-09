import React, { useState, useEffect } from "react";
import {usePrompt} from 'react-router-dom';
// import NavigationPrompt from "react-router-navigation-prompt";

const useUnsavedChangesWarning = (message = "Are you sure want to ") => {
    const [isDirty, setDirty] = useState(false);

    useEffect(() =>{
        window.onbeforeunload = isDirty && (() => message);

        return () =>{
          window.onbeforeunload = null;
        }
    },[isDirty])

    const routerPrompt = usePrompt("Are you sure you want to leave?", isDirty)



  return [routerPrompt, () => setDirty(true), () => setDirty(false)]
};

export default useUnsavedChangesWarning;
