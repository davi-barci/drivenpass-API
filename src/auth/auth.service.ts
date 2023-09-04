import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { UsersRepository } from 'src/users/users.respository';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'DrivenPass';
  private AUDIENCE = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp(createUser: SignUpDto) {
    const isEmailAlreadyRegistered = await this.usersRepository.findUserByEmail(
      createUser.email,
    );

    if (isEmailAlreadyRegistered) throw new ConflictException();

    const newPassword = await bcrypt.hash(createUser.password, 10);

    const newUser = {
      email: createUser.email,
      password: newPassword,
    };

    return await this.usersRepository.create(newUser);
  }

  async signIn(signInUser: SignInDto) {
    const user = await this.usersRepository.findUserByEmail(signInUser.email);

    if (!user) throw new UnauthorizedException();

    const password = await bcrypt.compare(signInUser.password, user.password);

    if (!password) throw new UnauthorizedException();

    const payload: JwtPayload = { id: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.EXPIRATION_TIME,
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      }),
    };
  }
}
