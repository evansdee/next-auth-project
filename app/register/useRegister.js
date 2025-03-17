import { getUsers, register } from "@/util/service";
import { useMutation,useQueryClient,useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";



export function useRegister() {
const queryClient = useQueryClient();
  
    const { mutate, isPending, error, isError,reset } = useMutation({
      mutationFn:register,
    //   mutationFn: (val) => register(val),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["usersMut"] });
      },
      onError: (error) => {
        console.error("Mutation Error:", error); // ✅ Log full error
  
        // ✅ Ensure the error message is extracted correctly
        const errorMessage =
          error?.response?.data?.message || error?.message || "Something went wrong!";
        
        toast.error(errorMessage);
      },
    });

    // console.log(isPending,"reg")
  
    return { mutate, isPending, error, isError,reset };
  }
  

  export function useGetUsers(){
    const queryClient = useQueryClient();

    const {data,isLoading} = useQuery({
        queryKey:["users"],
        queryFn: getUsers,
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })

    return {data,isLoading}
  }