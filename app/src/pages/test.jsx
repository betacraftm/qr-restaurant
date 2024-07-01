import { useEffect, useState } from "react";
import { getUserPosition, haversineDistance } from "src/utils/getLocation";

const fixedPosition = { latitude: 21.184512, longitude: 106.0798464 };
const thresholdDistance = 1;

const Test = () => {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    async function checkProximity() {
      try {
        const userPosition = await getUserPosition();
        console.log(userPosition);
        const distance = haversineDistance(userPosition, fixedPosition);
        if (distance <= thresholdDistance) {
          setIsNear(true);
        } else {
          setIsNear(false);
        }
      } catch (error) {
        console.error("Error getting user position:", error);
      }
    }

    checkProximity();
  }, []);

  return (
    <div>
      {isNear ? (
        <p>User is within the threshold distance.</p>
      ) : (
        <p>User is outside the threshold distance.</p>
      )}
    </div>
  );
};

export default Test;
