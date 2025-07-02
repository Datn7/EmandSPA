import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log('AuthInterceptor invoked, token:', token);
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Sending request with Authorization header:', cloned);
    return next(cloned);
  }
  console.log('Sending request without Authorization header');
  return next(req);
};
