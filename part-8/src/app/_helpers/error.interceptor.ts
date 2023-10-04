import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if ([401, 403].includes(error.status) && this.accountService.userValue) {
                    // auto logout if 401 or 403 response returned from API
                    this.accountService.logout();
                }

                const errorMessage = error.error?.message || error.statusText;
                console.error(error);
                return throwError(errorMessage);
            })
        );
    }
}
