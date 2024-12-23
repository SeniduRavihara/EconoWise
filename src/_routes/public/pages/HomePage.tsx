import { Button } from "@/components/ui/button";
import { logout } from "@/firebase/api";
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

  return (
    <div>
      <div>HomePage</div>

      <Button onClick={logoutUser}>Logout</Button>
    </div>
  );
};
export default HomePage;
