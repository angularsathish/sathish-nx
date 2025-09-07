import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '@services/auth.service';
import { LoginInput } from '@dtos/login.input';
import { Token } from '@entities/token.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Token)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(loginInput.username, loginInput.pass);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Mutation(() => Token)
  async register(@Args('registerInput') registerInput: LoginInput) {
    return this.authService.register(registerInput);
  }
}
