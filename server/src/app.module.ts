import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { StatisticsModule } from './statistics/statistics.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    StatisticsModule,
    EmailModule,
    MediaModule,
  ],
})
export class AppModule {}
