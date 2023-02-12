import { Injectable,inject } from '@angular/core';
import { UserService } from './services/user.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  userService=inject(UserService)
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.userService._userState.value.jwt
    if(token){
      const new_request=request.clone({
        headers:request.headers.set('Authorization','Bearer '+token)
      })
      return next.handle(new_request)
    }
   
    return next.handle(request);
  }
}
