import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert.component';
import { PlaceHolderDirective } from '../shared/PlaceHolder/place-holder-directive.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
    isLogin = true;
    isLoading = false;
    error: string = null;
    authObs: Observable<AuthResponseData>;
    @ViewChild(PlaceHolderDirective, { static: true }) hostAlert: PlaceHolderDirective;
    alertSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnDestroy(): void {
        // this.alertSub.unsubscribe();
    }

    ngOnInit(): void {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.onHandleError(this.error);
            }
        });
    }

    onSwitchMode(): void {
        this.isLogin = !this.isLogin;
    }

    onSubmit(formData: NgForm): void {
        // this.isLoading = true;
        // console.log({ ...formData });

        if (this.isLogin) {
            // this.authObs = this.authService.loginIn(formData.value.email, formData.value.password);
            this.store.dispatch(
                new AuthActions.LoginStart({ email: formData.value.email, password: formData.value.password })
            );
        } else {
            // this.authObs = this.authService.singUp(formData.value.email, formData.value.password);
            this.store.dispatch(
                new AuthActions.SignUp({ email: formData.value.email, password: formData.value.password })
            );
        }

        // this.authObs.subscribe(
        //     data => {
        //         console.log(data);
        //         this.router.navigate(['/recipes']);
        //     },
        //     error => {
        //         // console.log(error);
        //         this.error = error;
        //         this.onHandleError(error);
        //     }
        // );

        formData.reset();
        // this.isLoading = false;
    }

    onCloseAlertWindow(): void {
        // this.error = null;
        this.store.dispatch({ type: AuthActions.CLEAR_ERROR });
    }

    onHandleError(message: string): void {
        const alertCmpFactory = this.componentResolver.resolveComponentFactory(AlertComponent);
        this.hostAlert.viewContainerRef.clear();
        const component = this.hostAlert.viewContainerRef.createComponent(alertCmpFactory);
        component.instance.message = message;
        this.alertSub = component.instance.close.subscribe(() => {
            this.hostAlert.viewContainerRef.clear();
            this.alertSub.unsubscribe();
        });
    }
}
