import { createContext } from "react";

export const Staffs = createContext({});


function StaffsProvider({children, value}) {
  return (
      <Staffs.Provider value={value}>
          {
              children
          }
      </Staffs.Provider>
  );
}


export default StaffsProvider;

