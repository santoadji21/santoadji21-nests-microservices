import { NOTIFICATIONS_SERVICE } from '@app/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from '../dto/payment-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        payment_method: 'pm_card_visa',
        amount: amount * 100,
        currency: 'usd',
      });

      this.notificationsService.emit('notify_email', {
        email,
        text: `Your payment of $${amount} has completed successfully.`,
      });
      return paymentIntent;
    } catch (error) {
      throw new Error('Error creating payment intent');
    }
  }
}
