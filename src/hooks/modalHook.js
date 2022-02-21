import { useContext } from "react";
import { ModalContext } from "context/modalContext";

const useModal = (...props) => {
  const { modalStatus, setModalStatus } = useContext(ModalContext);

  const handleShowModal = (children) => {
    setModalStatus({
      body: children,
      showModal: true,
    });
  };
  const handleCloseModal = () => {
    setModalStatus({
      body: null,
      showModal: false,
    });
  };

  return {modalStatus, handleShowModal,handleCloseModal };
};

export default useModal;
