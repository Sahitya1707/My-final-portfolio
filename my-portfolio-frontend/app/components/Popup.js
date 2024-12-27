import { useEffect } from "react";
import { usePopupStatus } from "../utils/stores/popup";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
const Popup = () => {
  const content = usePopupStatus((state) => state.popupContent);
  const popupStatus = usePopupStatus((state) => state.popupStatus);
  const successMessageIcon = usePopupStatus(
    (state) => state.successMessageIcon
  );
  const setPopupShow = usePopupStatus((state) => state.updatePopupStatus);

  useEffect(() => {
    if (popupStatus === true) {
      setTimeout(() => {
        console.log(false);
        setPopupShow(false);
      }, 3000);
    }
  }, [popupStatus]);
  return (
    <div className="fixed top-5 right-5   bg-colorNav p-2 rounded-lg flex items-center gap-x-2 shadow-sm shadow-colorText/30 text-colorText z-[2000] capitalize">
      {successMessageIcon ? (
        <span className="text-[green] border-[green] border-2  border-solid p-1 rounded-full text-lg">
          <TiTick />
        </span>
      ) : (
        <span className="text-[red] border-[red] border-2  border-solid p-1 rounded-full text-lg">
          <RxCross2 />
        </span>
      )}

      <p>{content}</p>
    </div>
  );
};

export default Popup;
