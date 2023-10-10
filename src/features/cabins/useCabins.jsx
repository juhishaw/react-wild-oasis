import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export const useCabins = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
};
