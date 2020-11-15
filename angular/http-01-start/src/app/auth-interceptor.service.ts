import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // if (req.url !== 'some url') {
    //   console.log('request is on its way');
    // }
    // return next.handle(req);
    // interceptors transform the outgoing request before passing it to the next interceptor in the chain(or the backend if no interceptors remain in the chain.), by calling next.handle(transformedReq)

    /* modify request: */ 
    // console.log(req.url);
    // console.log(req);
    const modifiedReq = req.clone({
      // url: 'some rule',
      headers: req.headers.append('auth', 'ayz')
    });
  
    return next.handle(modifiedReq).pipe( // we can also interact with response right here
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('response has come (from interceptor)')
        }
      })
    );
  }
}