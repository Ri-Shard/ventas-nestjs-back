import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VentasModule } from './modules/ventas/ventas.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailModule } from './modules/email/email.module';
@Module({
  imports: [VentasModule,EmailModule,
     MongooseModule.forRootAsync({
       imports: [ConfigModule],
       inject: [ConfigService],
       useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
     }),
     MailerModule.forRoot({
      transport: {
        host: 'smtp2go.com',
        port: 465,
        secure: true,
        auth: {
          user: 'api-90285468D60C4112B3F8BB812978A7A0',
          pass: '',
        },
      },
      defaults: {
        from: '"No Reply" <Ventas@camilacharry.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),],
  controllers: [AppController],
  providers: [AppService],
 })
 export class AppModule {}