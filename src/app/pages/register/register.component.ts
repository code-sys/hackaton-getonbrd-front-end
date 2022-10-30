import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../services/theme/theme.service';
import { UserService } from '../../services/users/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    darkTheme: boolean = this.themeService.getLocalStorageItem('darkTheme');
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastrService: ToastrService,
        private themeService: ThemeService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.createFormRegister();
    }

    createFormRegister() {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(50)]],
            name: ['', [Validators.required, Validators.minLength(2)]],
            fatherLastName: ['', [Validators.required, Validators.minLength(2)]],
            motherLastName: ['', [Validators.required, Validators.minLength(2)]],
            phone: ['', [Validators.required, Validators.minLength(9)]],
        });
    }

    registerUser() {
        this.userService.createUser(this.registerForm.value).subscribe({
            next: (_res) => {
                this.toastrService.success('Se registro exitosamente');
                this.router.navigate(['/login']);
            },
            error: (_err) => {
                this.toastrService.error('Sucedio un error al registrarse');
            },
        });
    }
}
