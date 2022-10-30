import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserUpdate, User, Response, UserForgotPassword } from '@core/interfaces';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    createUser(user: UserUpdate): Observable<Response> {
        return this.http.post<Response>(`${environment.API_URL}/users`, user);
    }

    updateUser(user: UserUpdate): Observable<Response> {
        return this.http.patch<Response>(`${environment.API_URL}/users`, user);
    }

    resetUserPassword(userForgotPassword: UserForgotPassword): Observable<Response> {
        return this.http.post<Response>(`${environment.API_URL}/auth/reset-password`, userForgotPassword);
    }

    saveUserNotification(token: PushSubscription): Observable<Response> {
        return this.http.post<Response>(`${environment.API_URL}/notificacion`, {
            tokenPush: JSON.stringify(token),
        });
    }

    getProfile(): Observable<User> {
        return this.http.get<User>(`${environment.API_URL}/users/profile`);
    }

    uploadPhoto(file : File): Observable<Response> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post<Response>(`${environment.API_URL}/users/photo`, formData);
    }
}
