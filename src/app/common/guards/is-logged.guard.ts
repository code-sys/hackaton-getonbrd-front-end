import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserLoginResponse } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class IsLogged implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}
    canActivate(): Observable<boolean> {
        return this.authService.user$.pipe(
            take(1),
            map((user: UserLoginResponse) => (user ? true : false))
        );
    }
}
