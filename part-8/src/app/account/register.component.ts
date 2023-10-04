import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';
import { FlaskBackendService } from '../_helpers/flask-backend.service';


@Component({
  templateUrl: 'register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],

})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flaskBackendService: FlaskBackendService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const { firstName, lastName, username, password } = this.form.value;

    this.flaskBackendService
      .register(firstName, lastName, username, password)
      .subscribe(
        () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/account/login'], {
            queryParams: { registered: true },
          });
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
