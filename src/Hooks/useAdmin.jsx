import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);

  // use axios secure with react query
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        ` https://eduvi-server.vercel.app/users/admin/${user?.email}`,
      );

      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
