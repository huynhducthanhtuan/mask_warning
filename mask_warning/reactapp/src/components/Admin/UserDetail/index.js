import React from "react";
import Frame from "../Frame";
import TableUsers from "../TableUsers";
import UserInFormation from "./UserInFormation";
const UsersDetail = () => {
  const UserExample = {
    id: "123255224",
    name: "Huỳnh Đức Thanh Tuấn",
    Address: "72 Phạm Như Xương, Liên Chiều, Đà Nẵng",
    Email: "thanhtuan@mail.com",
    Telephone: "(+84)967993259",
    DayOfBirth: "16/02/2001",
    StoreName: "Shop Highway Menswear",
  };
  return (
    <Frame>
      <UserInFormation data={UserExample} />
    </Frame>
  );
};
export default UsersDetail;
