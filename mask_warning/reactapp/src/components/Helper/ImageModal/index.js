import "./ImageModal.css";
import { useRef } from "react";
import { reportImageDefault } from "../../../assets/ExportImages";

function ImageModal({ showModal, setShowModal, imageUrl }) {
  const giftBannerPopupRef = useRef();
  const giftBannerPopupCloseBtnRef = useRef();

  const handleClickModal = () => {
    setTimeout(() => {
      // hide modal
      setShowModal(false);

      // enable scrolling
      document.querySelector("body").style.overflow = "visible";
      document.querySelector("#app").style.position = "absolute";
    }, 100);
  };

  const handleClickGiftBannerPopup = (e) => {
    e.stopPropagation();
  };

  const handleClickGiftBannerPopupCloseBtn = (e) => {
    e.stopPropagation();
    document.querySelector("#modal").click();
  };

  return (
    <div id="modal" onClick={handleClickModal}>
      <div className="modal__overlay"></div>

      <div className="modal__body">
        <div
          ref={giftBannerPopupRef}
          onClick={(e) => handleClickGiftBannerPopup(e)}
          style={{ display: "block" }}
          className="gift-banner__popup"
        >
          <img
            src={imageUrl || reportImageDefault}
            className="gift-banner__popup__label"
          />
          <button
            ref={giftBannerPopupCloseBtnRef}
            onClick={(e) => handleClickGiftBannerPopupCloseBtn(e)}
            className="gift-banner__popup__close-btn"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
