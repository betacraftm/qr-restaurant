import { getUserPosition } from "src/utils/getLocation";
import { useEffect, useState } from "react";

const Modal = () => {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const test = async () => {
      try {
        const userPos = await getUserPosition();
        console.log(userPos);
        setStatus(true);
      } catch (error) {
        setStatus(false);
      }
    };
    test();
  }, []);
  return <div>{status ? "True" : "False"}</div>;
};

export default Modal;
