import { getTemplates } from "../api";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const useTemplate = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "template",
    async () => {
      try {
        const templates = await getTemplates();
        return templates; // Ensure you return the data
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
        return []; // Return an empty array or suitable fallback
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { data, isLoading, isError, refetch };
};

export default useTemplate;
