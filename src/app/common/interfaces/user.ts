export interface UserLogin {
    username: string;
    password: string;
}

export interface UserLoginResponse {
    id: number;
    username: string;
    role: string;
    token: string;
    message: string;
    firstLogin?: boolean;
}

export interface User {
    id?: number;
    username: string;
    createdAt?: Date;
    updateAt?: Date;
    name: string;
    fatherLastName: string;
    motherLastName: string;
    status?: string;
    firstLogin?: boolean;
    photo?: string;
    phone?: string;
    techSkills?: string;
    softSkills?: string;
}

export interface UserUpdate {
    fatherLastName: string;
    motherLastName: string;
    name: string;
    username: string;
    experience?: string;
    techSkills?: string;
    softSkills?: string;
    phone: string;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface UserForgotPassword {
    username: string;
}
