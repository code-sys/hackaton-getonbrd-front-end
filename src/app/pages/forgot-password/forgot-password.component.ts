import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../services/theme/theme.service';
import { UserService } from '../../services/users/user.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    darkTheme: boolean = this.themeService.getLocalStorageItem('darkTheme');
    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private themeService: ThemeService
    ) {}

    ngOnInit(): void {
        this.forgotPasswordForm = this.fb.group({
            username: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(50)]],
        });
    }

    resetPassword() {
        this.userService.resetUserPassword(this.forgotPasswordForm.value).subscribe({
            next: (_res) => {
                this.toastrService.success('Se reseteo exitosamente su contraseña');
            },
            error: (_err) => {
                this.toastrService.error('Sucedio un error al resetear el email');
            },
        });
    }
}
