import React from "react";

/**
 * Context for the files, so that files can be accessed across the front end.
 */
export const Files = React.createContext<{ files: { file1?: object, file2?: object }, setFile: Function }>({
    files: {},
    setFile: (index: string, file: object,) => { },
})