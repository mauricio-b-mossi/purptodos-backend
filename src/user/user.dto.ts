export class ReturnUserDto{
    id: number;
    username: string;
}

export class CreateUserDto{
    username: string;
    passowrd: string
}

export class AuthUserDto{
    id: number;
    username: string;
    passowrd: string
}

export class LoginReturnUser {
  id: number;
  username: string;
  access_token: string;
}

