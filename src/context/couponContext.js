import { createContext } from "react";

export const Coupons = createContext({});


function CouponsProvider({children, value}) {
  return (
      <Coupons.Provider value={value}>
          {
              children
          }
      </Coupons.Provider>
  );
}


export default CouponsProvider;

