import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';



import { FlaskBackendService } from '../_helpers/flask-backend.service';
import { AlertService } from '../_services/alert.service';

// Define an interface for the expected error structure
interface ErrorResponse {
  message: string; // Define the structure as needed
  // You can include additional properties if needed
}

@Component({
  templateUrl: 'login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flaskBackendService: FlaskBackendService,
    private alertService: AlertService
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Check if the user is already logged in
    const isLoggedIn = await this.flaskBackendService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    try {
      await this.flaskBackendService.authenticate(
        this.f.username.value,
        this.f.password.value
      );
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    } catch (error) {
      // Cast the error object to the defined interface
      const typedError = error as ErrorResponse;

      this.alertService.error(typedError.message);
      this.loading = false;
    }
  }
}


