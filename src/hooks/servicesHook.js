import { useContext } from "react";
import { ServicesContext } from "context/servicesContext";

const useServicesContext = () => {
  const { currentServiceId, setCurrentServiceId } =
    useContext(ServicesContext);
  return {  currentServiceId, setCurrentServiceId };
};

export default useServicesContext;
