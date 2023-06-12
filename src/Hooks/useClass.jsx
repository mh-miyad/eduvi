import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const useClass = () => {
  //

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axios.get(`https://eduvi-server.vercel.app/courses`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return [classes];
};

export default useClass;
