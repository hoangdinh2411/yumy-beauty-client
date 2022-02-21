import { createContext } from "react";

export const Categories = createContext({});


function CategoriesProvider({children, value}) {
  return (
      <Categories.Provider value={value}>
          {
              children
          }
      </Categories.Provider>
  );
}


export default CategoriesProvider;

