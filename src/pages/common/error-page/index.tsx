import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ErrorPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(pathname);
  }, [pathname]);
  return <>404</>;
};
export default ErrorPage;
