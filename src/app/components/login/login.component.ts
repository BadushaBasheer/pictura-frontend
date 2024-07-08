declare var google: any;
import {Component, OnInit, NgZone } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    hide = true;
    validateForm!: FormGroup;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private snackBar: MatSnackBar,
                private router: Router,
                private ngZone: NgZone) {
    }

    togglePasswordVisibility(): void {
        this.hide = !this.hide;
    }

    ngOnInit(): void {
        if (google) {
            google.accounts.id.initialize({
                client_id: '857286452271-sor3hu3bgqij1j4t185oeac3lv057qit.apps.googleusercontent.com',
                callback: (response: any) => this.ngZone.run(() => this.handleLogin(response))
            });

            google.accounts.id.renderButton(document.getElementById("google-btn"), {
                theme: 'filled_white',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular'
            });
        } else {
            console.error('Google accounts API is not available.');
        }

        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    submitLoginForm(): void {
        if (this.validateForm.invalid) {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control instanceof FormControl) {
                    control.markAsDirty();
                    control.updateValueAndValidity();
                }
            });
            return;
        }

        this.authService.loginUser(this.validateForm.value).subscribe({
            next: async () => {
                console.log('Login Form Submitted', this.validateForm.value);
                this.snackBar.open('Sign In Successful', 'Close', {
                    duration: 3000,
                    panelClass: 'app-notification-success'
                });
                try {
                    await this.router.navigateByUrl('/sideBar');
                } catch (error) {
                    this.snackBar.open('Error', 'Navigation failed', {
                        duration: 3000,
                        panelClass: 'app-notification-error'
                    });
                }
            },
            error: (error) => {
                this.snackBar.open(`${error.error}`, 'Error', {duration: 3000, panelClass: 'app-notification-error'});
            }
        });
    }
    private decodeToken(token: string) {
        return JSON.parse(atob(token.split(".")[1]));
    }

    handleLogin(response: any) {
        if (response) {
            const patLoad = this.decodeToken(response.credential)
        }
    }


}
