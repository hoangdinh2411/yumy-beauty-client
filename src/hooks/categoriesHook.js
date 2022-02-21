import { useContext } from "react";
import { Categories } from "context/categoriesContext";

const useCategoriesContext = () => {
  const { currentCategoriesId, setCurrentCategoriesId } = useContext(Categories);
  
  return { currentCategoriesId, setCurrentCategoriesId };
};

export default useCategoriesContext;
