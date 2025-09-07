import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async hello(@Args('name') name: string) {
    return `Hello, ${name}!`;
  }
}
