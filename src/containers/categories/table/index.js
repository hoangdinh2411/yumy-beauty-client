import React from "react";
import { tableHeadersCategories } from "constants";
import Column from "./column";
function CategoriesTable({ categoriesFilter }) {
  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          {tableHeadersCategories.map((item, index) => {
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
        {categoriesFilter?.map((item) => {
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

export default React.memo(CategoriesTable);
