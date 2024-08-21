import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between bg-stone-300 p-2">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img
          src="horizontal-logo.png"
          alt="logo"
          className="h-10 object-contain"
        />
      </div>
      <button className="btn">Sign In</button>
    </header>
  );
}
