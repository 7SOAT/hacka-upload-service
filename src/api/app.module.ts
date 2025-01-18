import { Module } from '@nestjs/common';
import RoutesModule from './routes/routes.module';

@Module({
  imports: [RoutesModule.register()],
})
export class AppModule {}
