export class ReturnUserDto{
    id: number;
    username: string;
}

export class CreateUserDto{
    email: string;
    username: string;
    password: string;
}


export class AuthUserDto{
    id: number;
    username: string;
    password: string
}

export class LoginReturnUser {
  id: number;
  username: string;
  access_token: string;
}

