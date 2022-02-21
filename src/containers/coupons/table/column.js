import { useDispatch } from "react-redux";
import useCouponsContext from "hooks/couponsHook";
import couponThunks from "store/coupons/couponThunks";

function Column({ item }) {
  const { setCurrentCouponId } = useCouponsContext();
  const status = (new Date().getTime() > new Date(item.endDate).getTime()) ? "Yes" : "No" 
  const dispatch = useDispatch()
  const handleEditCategory = (e) => {
    const id = e.target.dataset.id;
    setCurrentCouponId(id);
  };

  const handleDeleteCategory = (e) => {
    const id = e.target.dataset.id;
    dispatch(couponThunks.delete(id))
  };
  return (
    <>
      <td className="table__column--items">
        <span className="table__column--text">{item.code}</span>
      </td>
      <td className="table__column--items">
        <span className="table__column--text">{item.name}</span>
      </td>
      <td className="table__column--items">
        <span className="table__column--text">{item.percentage} %</span>
      </td>
      <td className="table__column--items">
        <span className="table__column--text">{item.startDate}</span>
      </td>
      <td className="table__column--items">
        <span className="table__column--text">{item.endDate}</span>
      </td>
      <td className="table__column--items">
        <span className="table__column--text" style={{color: status==="Yes" ? 'red': 'green', fontWeight: '600'}}>{status}</span>
      </td>
      <td>
        <span
          className="table__column--button"
          title="Edit Category"
          data-id={item._id}
          onClick={handleEditCategory}
        >
          Edit
        </span>
      </td>
      <td>
        <span
          className="table__column--button"
          title="Delete category"
          data-id={item._id}
          onClick={handleDeleteCategory}
        >
          Delete
        </span>
      </td>
    </>
  );
}

export default Column;
