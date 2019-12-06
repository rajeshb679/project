import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
    isLogin = true;
    isLoading = false;
    error: string = null;
    authObs: Observable<AuthResponseData>;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {}

    onSwitchMode(): void {
        this.isLogin = !this.isLogin;
    }

    onSubmit(formData: NgForm): void {
        this.isLoading = true;
        console.log(formData);

        if (this.isLogin) {
            this.authObs = this.authService.loginIn(formData.value.email, formData.value.password);
        } else {
            this.authObs = this.authService.singUp(formData.value.email, formData.value.password);
        }

        this.authObs.subscribe(
            data => {
                console.log(data);
                this.router.navigate(['/recipes']);
            },
            error => {
                // console.log(error);
                this.error = error;
            }
        );

        formData.reset();
        this.isLoading = false;
    }

    onCloseAlertWindow():void{
        this.error = null;
    }
}
