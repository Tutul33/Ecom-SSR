import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';


import { Observable, EMPTY, finalize, catchError, timeout, map, throwError } from 'rxjs';

import { HttpErrorHandler } from './http-error-handler.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private readonly APP_XHR_TIMEOUT = 100000;
  constructor(private errorHandlerService: HttpErrorHandler) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.performRequest(request)).pipe(
      timeout(this.APP_XHR_TIMEOUT),
      map((event: HttpEvent<any>) => this.handleSuccessfulResponse(event)),
      catchError((error: HttpErrorResponse) => this.processRequestError(error, request, next)),
      finalize(this.handleRequestCompleted.bind(this))
    );
  }

  private performRequest(request: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = request.headers;
    //headers = headers.set('MyCustomHeaderKey', `MyCustomHeaderValue`);
    return request.clone({ headers });
  }

  private handleSuccessfulResponse(event: HttpEvent<any>): HttpEvent<any> {
    if (event instanceof HttpResponse) {
      if(event.body != null)
        event = event.clone({ body: event.body.response });      
    }
    return event;
  }

  private processRequestError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> 
  {
    console.log('http error response');

    this.errorHandlerService.handle(error);
    return throwError(() => error);
  }

  private handleRequestCompleted(): void {
    
  }
}



