import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  @IsNotEmpty()
  password: string;
}

export class CreateSignUpDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
