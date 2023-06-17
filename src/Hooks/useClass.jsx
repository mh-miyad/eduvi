import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const useClass = () => {
  //

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axios.get(`http://localhost:5000/courses`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return [classes];
};

export default useClass;
