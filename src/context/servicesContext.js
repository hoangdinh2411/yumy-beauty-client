import { createContext } from "react";

export const ServicesContext = createContext({});


function ServicesProvider({children, value}) {
  return (
      <ServicesContext.Provider value={value}>
          {
              children
          }
      </ServicesContext.Provider>
  );
}


export default ServicesProvider;

