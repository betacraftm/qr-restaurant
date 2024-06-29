import { Link } from "react-router-dom";
import ThemeController from "src/components/ThemeController";

const Header = () => {
  return (
    <div className="border-b-2 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold tracking-tight">
          Logo.com
        </Link>
        <ThemeController />
      </div>
    </div>
  );
};

export default Header;
