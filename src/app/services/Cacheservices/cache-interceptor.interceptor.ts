import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheResolverService } from './cache-resolver.service';

const TIME_TO_LIVE = 10000;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, any>();
  private cacheExpirationTime = 6000;
  
  constructor(private cacheResolver: CacheResolverService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url.startsWith('https://localhost:7054/api/Users/menusList')) {
      const cachedResponse = this.cache.get(request.url);

      if (cachedResponse) {
        const timeStored = cachedResponse.timeStored;
        const currentTime = new Date().getTime();

        if (currentTime - timeStored < this.cacheExpirationTime) {
          return of(cachedResponse.response);
        } else {
          this.cache.delete(request.url);
        }
      }

      return next.handle(request).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            this.cache.set(request.url, { response: event, timeStored: new Date().getTime() });
          }
        })
      );
    }

    return next.handle(request);
  }

  intercept1(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    if (req.headers.get('x-refresh')) {
      return this.sendRequest(req, next);
    }

    const cachedResponse = this.cacheResolver.get(req.url);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheResolver.set(req.url, event, TIME_TO_LIVE);
        }
      })
    );
  }

}

export const cacheHttpResponse = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
]
