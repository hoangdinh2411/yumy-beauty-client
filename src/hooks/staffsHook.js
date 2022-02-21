import { useContext } from "react";
import { Staffs } from "context/staffsContext";

const useStaffsContext = () => {
  const {staffId, setStaffId } = useContext(Staffs);
  
  return {staffId, setStaffId };
};

export default useStaffsContext;
