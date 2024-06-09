import { useQuery } from "react-query"

const useFilter = () =>{
  const { data, isLoading, isError , refetch } = useQuery("globalFilter",
    ()=>({ searchTerm: ""}),
    { refetchOnWindowFocus: false}
  );
  return { data, isLoading, isError, refetch }
}
export default useFilter