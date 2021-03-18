import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { UserService } from "../../services/user/user.service";

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: UserService) {}

  //<any> means we intercept all requests
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }


    const authToken = this.authService.returnToken(); //get the token from the auth service file
    const authRequest = req.clone({//clone the request and append to the header
      headers: req.headers.append("authorization", authToken)
    });
    console.log(authRequest);
    return next.handle(authRequest);//outputting the new request
  }
}
