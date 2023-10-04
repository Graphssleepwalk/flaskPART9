import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Import your custom BackendInterceptor
import { FlaskBackendService } from './app/_helpers/flask-backend.service'; // Update the import path

import { AppComponent } from '@app/app.component';
import { JwtInterceptor, ErrorInterceptor } from '@app/_helpers';
import { APP_ROUTES } from '@app/app.routes';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(APP_ROUTES),
        provideHttpClient(
            withInterceptors([
                { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: FlaskBackendService, multi: true } as any
            ])
        )
    ]
});

