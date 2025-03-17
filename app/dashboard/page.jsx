import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function Dashboard() {

    const session = await getServerSession()

    console.log(session);
    

    // if(!session){
    //     redirect("/")
    // }
  return (
    <div>Dashboard</div>
  );
}
