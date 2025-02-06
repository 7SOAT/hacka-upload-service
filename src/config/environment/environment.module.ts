import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../.env',
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export default class EnvironmentModule {}
