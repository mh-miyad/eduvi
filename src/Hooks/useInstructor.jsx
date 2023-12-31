import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import axios from "axios";

const useInstructor = () => {
  //   const { user, logOut } = useContext(AuthContext);

  const { data: instructor = [] } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      try {
        const res = await axios.get(`http://localhost:5000/instructor`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return [instructor];
};

export default useInstructor;
