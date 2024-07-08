import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {GlobalConstants} from "../../shared/global-constants";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    validateForm !: FormGroup;
    hide = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, this.matchPassword('password')]],
        });
    }

    matchPassword(password: string) {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (!control || !control.parent) {
                return null;
            }
            const passwordControl = control.parent.get(password);
            if (passwordControl && passwordControl.value !== control.value) {
                return {mismatch: true};
            }
            return null;
        };
    }

    submitRegisterForm(): void {
        if (this.validateForm.invalid) {
            for (const i in this.validateForm.controls) {
                if (this.validateForm.controls.hasOwnProperty(i)) {
                    this.validateForm.controls[i].markAsDirty();
                    this.validateForm.controls[i].updateValueAndValidity();
                }
            }
            return;
        }

        this.authService.registerUser(this.validateForm.value).subscribe({
            next: value => {
                this.snackBar.open('Signup Successful', 'Close', {duration: 3000});
                try {
                    this.router.navigateByUrl('/login').then(r => {
                        return value;
                    });
                } catch (error) {
                    this.snackBar.open('Navigation failed', 'Close', {duration: 3000});
                }
            },
            error: (error) => {
                this.snackBar.open(`${error.error}`, 'Close', {duration: 3000});
            }
        });
    }

    togglePasswordVisibility() {
        this.hide = !this.hide;
    }
}

