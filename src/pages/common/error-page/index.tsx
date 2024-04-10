import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ErrorPage = () => {
  const [notFound, setNotFound] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(123123);
    navigate(pathname);
    setNotFound(true);
  }, [navigate, pathname]);
  return notFound && <>404</>;
};
export default ErrorPage;
