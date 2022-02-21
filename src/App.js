import React, { useEffect, useState } from "react";
// import DashBoardLayout from "pages/homeLayout";
import Routing from "routing";
import { MessageBox } from "components";
import { useSelector, useDispatch } from "react-redux";
import messageAction from "store/message/actions";

function App() {
  const dispatch = useDispatch();
  const messageFromServer = useSelector((state) => state.message);
  const [showMessageBox, setShowMessageBox] = useState(false);

  // Show alert message box
  useEffect(() => {
    if (messageFromServer) {
      setShowMessageBox(true);
      dispatch(messageAction.clearMessage());
    }
    const timeout = setTimeout(() => {
      setShowMessageBox(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [messageFromServer]);

  return (
    <>
      <div className="body">
        <div className="main">
          <div className="grid wide ">
            <Routing />
          </div>
        </div>
      </div>
      <MessageBox show={showMessageBox} messageFromServer={messageFromServer} />
    </>
  );
}

export default App;
