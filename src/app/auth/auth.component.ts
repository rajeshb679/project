import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
    isLogin = true;

    constructor() {}

    ngOnInit() {}

    onSwitchMode(): void {
        this.isLogin = !this.isLogin;
    }
}
