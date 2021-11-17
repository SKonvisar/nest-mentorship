import { Module } from '@nestjs/common';
import { UsersModule } from './Users/Users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
