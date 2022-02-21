import React from "react";
import { tableHeadersStaffs } from "constants";
import Column from "./column";
import { useSelector } from "react-redux";
function StaffTable({ staffs }) {
  const categories = useSelector((state) => state.categories);
  
  return (
      <table className="table">
        <thead  className="table__header">
          <tr>
            {tableHeadersStaffs.map((item, index) => {
              return (
                <th key={index} className="table__text">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {staffs?.map((staff) => {
            //filter categories info by category id for per staff
            const categoriesOfStaff = categories.filter((category) => {
                for(let j=0; j< staff.categories.length; j++){
                  if(staff.categories[j]=== category._id){
                    return true
                  }
                }
            });
            return (
              <tr key={staff._id} className="table__content">
                <Column staff={staff} categoriesOfStaff={categoriesOfStaff} />
              </tr>
            );
          })}
        </tbody>
      </table>
  );
}

export default React.memo(StaffTable);
