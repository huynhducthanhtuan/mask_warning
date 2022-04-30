import React from "react";
import { LoadingReport } from "../../../assets/ExportImages";
const Loading = ({ srcIcon }) => {
  return <img src={srcIcon ? srcIcon : LoadingReport} style={{ marginLeft: "18%" }} alt="" />;
};

export default Loading;
