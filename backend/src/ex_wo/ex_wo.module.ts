import { Module } from '@nestjs/common';
import { ExWoService } from './ex_wo.service';
import { ExWoController } from './ex_wo.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ExWoService],
  controllers: [ExWoController],
})
export class ExWoModule {}
