import useServicesContext from "hooks/servicesHook";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import servicesThunks from "store/services/servicesThunks";

function Column({ item, category, staffsForService }) {
  const dispatch = useDispatch();
  const { setCurrentServiceId } = useServicesContext();
  const handleEditService = (e) => {
    const id = e.target.dataset.id;
    setCurrentServiceId(id);
  };

  const handleDeleteService = (e) => {
    if (window.confirm("Are you sure?") === true) {
      const id = e.target.dataset.id;
      dispatch(servicesThunks.deleteService(id));
    }
  };
  return (
    <>
      <td className="table__column--items">
        <img className="table__column--image " src={item.selectedFile} alt=""></img>
      </td>
      <td className="table__column--items">
        <span className="table__column--text ">{item.name}</span>
      </td>
      <td className="table__column--items">
        <span className="table__column--text ">{category?.name}</span>
      </td>
      <td className="table__column--items">
        <span className="table__column--text ">{item.price} kr</span>
      </td>
      <td className="table__column--items">
        <span className="table__column--text ">{item.timeTake} minutes</span>
      </td>
      <td className="table__column--items">
        <ul className="table__column--list">
          {staffsForService?.map((staff) => (
              <li key={staff._id} className="table__column--selectedItems ">{staff.fullName}</li>
          ))}
        </ul>
      </td>
      <td>
        <span
          className="table__column--button"
          title="Edit service"
          data-id={item._id}
          onClick={(e) => handleEditService(e)}
        >
          Edit
        </span>
      </td>
      <td>
        <span
          className="table__column--button"
          title="Delete service"
          data-id={item._id}
          onClick={(e) => handleDeleteService(e)}
        >
          Delete
        </span>
      </td>
      <td>
        <Link
          to={`/services/${item._id}`}
          className="table__column--button"
          title="Info about the service"
          data-id={item._id}
        >
          Info
        </Link>
      </td>
    </>
  );
}

export default React.memo(Column);
