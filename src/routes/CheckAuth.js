import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ children }) => {

  const location = useLocation();
//   if (["/customeraddress", "/customeraddress/change"].includes(location.pathname) && _.isEmpty(customer.customerDetails))
//     return <Navigate to="/searchcustomer" replace={true} state={{ from: location }} />
  if (localStorage.getItem("token"))
    return children;
//   console.log("redirecting to login page")

  return <Navigate to="/login" replace={true} state={{ from: location }} />
}

export default CheckAuth