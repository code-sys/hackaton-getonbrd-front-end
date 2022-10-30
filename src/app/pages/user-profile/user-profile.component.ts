import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PdfCVData } from '@core/interfaces/pdf-cv-data';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GenerateCvPdfService } from 'src/app/services/curriculum-vitae/generate-cv-pdf.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    photoUser: string;
    userProfileForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastrService: ToastrService,
        private userService: UserService,
        private router: Router,
        private generateCvPdfService: GenerateCvPdfService,
    ) {}

    ngOnInit() {
        this.createUserProfileForm();
        this.getProfile();
    }

    createUserProfileForm() {
        this.userProfileForm = this.fb.group({
            username: null,
            name: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(120),
                    Validators.pattern('[A-Za-z ]+'),
                ]),
            ],
            motherLastName: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(120),
                    Validators.pattern('[A-Za-z ]+'),
                ]),
            ],
            fatherLastName: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(120),
                    Validators.pattern('[A-Za-z ]+'),
                ]),
            ],
            techSkills: null,
            softSkills: null,
            updateAt: null,
            experience: null,
        });
    }

    getProfile() {
        this.userService.getProfile().subscribe({
            next: (res) => {
                this.userProfileForm.patchValue(res);
                this.photoUser = res.photo;
            },
            error: (_err) => {
                this.toastrService.error('Sucedio un error al obtener el perfil');
            },
        });
    }

    updateProfile() {
        this.userService.updateUser(this.userProfileForm.value).subscribe({
            next: (_res) => {
                this.toastrService.success('Se actualizo exitosamente su perfil');
            },
            error: (_err) => {
                this.toastrService.error('Error al actualizar su perfil');
            },
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
        localStorage.removeItem('user');
    }

    showCVPdf(){
        const myProfileData: PdfCVData = {
            experience: this.userProfileForm.get('experience')?.value,
            fullname: this.userProfileForm.get('name')?.value + ' ' +
            this.userProfileForm.get('fatherLastName')?.value + ' ' + this.userProfileForm.get('motherLastName')?.value,
            image: '',
            softSkills: this.userProfileForm.get('softSkills')?.value,
            technicalSkills: this.userProfileForm.get('techSkills')?.value,
        };
        this.generateCvPdfService.exportAsPDF(myProfileData);
    }
}
