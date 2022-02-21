import useStaffsContext from "hooks/staffsHook";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import staffThunks from "store/staffs/staffThunks";

function Column({ staff, categoriesOfStaff }) {
  const dispatch = useDispatch();
  const {setStaffId } = useStaffsContext();
  const handleEditService = (e) => {
    const id = e.target.dataset.id;
    setStaffId(id);
  };

  const handleDeleteService = (e) => {
    if (window.confirm("Are you sure?") === true) {
      const id = e.target.dataset.id;
      dispatch(staffThunks.delete(id));
    }
  };
  return (
    <>
      <td className="table__column--items">
        <img className="table__column--image " src={staff.selectedFile} alt=""></img>
      </td>
      <td className="table__column--items">
        <span className="table__column--text ">{staff.fullName}</span>
      </td>
      <td className="table__column--items">
        {/* Render categories that staff can work with */}
        <ul className="table__column--list">
          {categoriesOfStaff?.map((item) => (
            <li key={item._id} className="table__column--selectedItems ">{item.name}</li>
          ))}
        </ul>
      </td>
      <td className="table__column--items">
        <span className="table__column--text ">{staff.phone}</span>
      </td>
      <td>
        <span
          className="table__column--button"
          title="Edit service"
          data-id={staff._id}
          onClick={(e) => handleEditService(e)}
        >
          Edit
        </span>
      </td>
      <td>
        <span
          className="table__column--button"
          title="Delete service"
          data-id={staff._id}
          onClick={(e) => handleDeleteService(e)}
        >
          Delete
        </span>
      </td>
      <td>
        <Link
          to={`/staffs/${staff._id}`}
          className="table__column--button"
          title="Info about the service"
          data-id={staff._id}
        >
          Info
        </Link>
      </td>
    </>
  );
}

export default React.memo(Column);
