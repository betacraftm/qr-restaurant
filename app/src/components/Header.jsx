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
        <div className="flex items-center justify-center gap-4 min-[426px]:gap-2">
          <ThemeController />
          <button onClick={() => navigate("/login")}>
            <FontAwesomeIcon
              icon={faRightToBracket}
              className="text-xl min-[426px]:hidden"
            />
          </button>

          <button
            className="btn hidden min-[426px]:inline-flex"
            onClick={() => navigate("/login")}
          >
            Đăng Nhập
            <FontAwesomeIcon icon={faRightToBracket} className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
