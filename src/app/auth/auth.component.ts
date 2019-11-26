import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
    isLogin = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) {}

    ngOnInit() {}

    onSwitchMode(): void {
        this.isLogin = !this.isLogin;
    }

    onSubmit(formData: NgForm): void {
        this.isLoading = true;
        console.log(formData);
        if (this.isLogin) {
        } else {
            this.authService.singUp(formData.value.email, formData.value.password).subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    // console.log(error);
                    this.error = error;
                }
            );
        }

        formData.reset();
        this.isLoading = false;
    }
}
