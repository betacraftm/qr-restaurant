import { Link, useNavigate } from "react-router-dom";
import ThemeController from "src/components/ThemeController";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b-2 px-5 py-6 lg:px-0">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold tracking-tight">
          Logo.com
        </Link>
        <div className="flex items-center justify-center gap-3">
          <ThemeController />
          <button className="btn" onClick={() => navigate("/login")}>
            Đăng Nhập
            <FontAwesomeIcon icon={faRightToBracket} className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
