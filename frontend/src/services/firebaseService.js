import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; 

export const fetchBusses = async () => {
  const bussesCol = collection(db, "busses");
  const busSnapshot = await getDocs(bussesCol);
  const busList = busSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return busList;
};
