import { Button } from "@/components/ui/button";
import { logout } from "@/firebase/api";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };


  toast({
    title: "Exam created successfully",
    variant: "default",
  });

  return (
    <div>
      <div>HomePage</div>

      <Button onClick={logoutUser}>Logout</Button>
    </div>
  );
};
export default HomePage;
