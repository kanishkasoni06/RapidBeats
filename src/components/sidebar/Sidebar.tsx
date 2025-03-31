import { menuItems } from "../../constants/index";
import "./Sidebar.css";
import { auth } from "../../security/firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../../security/AuthProvider";
import { useContext } from "react";
// import { keycloak } from "../../pages/Auth";

const Sidebar = () => {
  //   const nav = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const logout = () => {
    console.log("logged out");
    auth.signOut().catch((error) => {
      // Handle sign-out errors if needed
      console.error(error);
    });
  };
  return (
    <aside className="sidebar">
      <nav className="menu">
        <div className="userName">Welcome {currentUser?.displayName}</div>
        <ul className="menu__list">
          {menuItems?.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.route} className="list-item">
                  <svg
                    className="list-item__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d={item.path} />
                  </svg>
                  <label className="list-item__label">{item.name}</label>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="btnWrap">
        <button
          type="button"
          className="btn btn-danger logout"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
