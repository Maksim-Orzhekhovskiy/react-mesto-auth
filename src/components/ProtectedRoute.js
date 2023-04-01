import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ component: Component, ...props }) {
  return props.isLogged ? <Component {...props} /> : <Navigate to="/sign-in" />;
}

export default ProtectedRouteElement;
