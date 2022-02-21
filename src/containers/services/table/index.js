import React from "react";
import { tableHeadersServices } from "constants";
import Column from "./column";
import { useSelector } from "react-redux";
function ServicesTable({ services }) {
  const categories = useSelector((state) => state.categories);
  const staffs = useSelector((state) => state.staffs);
  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          {tableHeadersServices.map((item, index) => {
            return (
              <th key={index} className="table__text">
                {item}
              </th>
            );
          })}
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {services?.map((service) => {
          const category = categories.find(
            (category) => category._id === service.category
          );
          const staffsForService = staffs.filter((staff) => {
            for (let j = 0; j < service?.staffs.length; j++) {
              if (service?.staffs[j] === staff._id) {
                return true;
              }
            }
          });

          return (
            <tr key={service._id} className="table__content">
              <Column
                item={service}
                category={category}
                staffsForService={staffsForService}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default React.memo(ServicesTable);
