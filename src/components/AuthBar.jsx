import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AuthBar() {
  const loc = useLocation();

  return (
    <div
      id="authbar"
      className="flex items-center justify-between px-10 text-center text-orange-400 bg-gray-900"
    >
      <div className="flex items-center">
        <img className="w-10" src="favicon.png" alt="" />
        <h1 className="font-medium text-3xl py-2 px-1 ">uddy</h1>
      </div>

      {loc.pathname != "/" && (
        <Link to="/" className="text-white hover:text-orange-400">
          <i className=" fa-solid fa-arrow-left"></i>
        </Link>
      )}
    </div>
  );
}
