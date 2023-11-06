import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotifyEmailDto } from './dto/notify-email.dto';

import * as AWS from 'aws-sdk';

@Injectable()
export class NotificationsService {
  private sns: AWS.SNS;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      region: this.configService.get('AWS_REGION'),
      credentials: new AWS.Credentials({
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      }),
    });
    // Create an SNS service object
    this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  }

  async notifyEmail({ email, text }: NotifyEmailDto) {
    console.log('email', email);
    // Prepare the parameters for the SNS publish action
    const params = {
      Message: text,
      Subject: 'Sleepr Notification',
      TopicArn: this.configService.get('SNS_EMAIL_TOPIC_ARN'),
      // Make sure to create a topic in AWS SNS and subscribe the email addresses you want to notify
    };
    // Send the email using AWS SNS
    try {
      const data = await this.sns.publish(params).promise();
      console.log('data', data);
      console.log(`Message sent to SNS with ID: ${data.MessageId}`);
    } catch (error) {
      console.error('Error sending a message via SNS', error);
      throw error;
    }
  }
}
