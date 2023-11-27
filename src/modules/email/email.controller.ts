import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('sendPurchaseNotification')
  async sendPurchaseNotificationToAdmin(@Body() body: any): Promise<any> {
    const { customerData, orderDetails } = body;
    return await this.emailService.sendEmail(customerData, orderDetails);
  }
}
