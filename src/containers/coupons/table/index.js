import React from "react";
import { tableHeadersCoupons } from "constants";
import Column from "./column";
import { useSelector } from "react-redux";
import { couponsRemainingSelector } from "store/selector";
function CouponsTable() {
  const coupons = useSelector(couponsRemainingSelector);
  return (
      <table className="table">
        <thead className="table__header">
          <tr>
            {tableHeadersCoupons.map((item, index) => {
              return (
                <th key={index}>
                  <p  className="table__text">{item}</p>
                </th>
              );
            })}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coupons?.map((item) => {
            return (
              <tr key={item._id} className="table__content">
                <Column item={item} />
              </tr>
            );
          })}
        </tbody>
      </table>
  );
}

export default React.memo(CouponsTable);
