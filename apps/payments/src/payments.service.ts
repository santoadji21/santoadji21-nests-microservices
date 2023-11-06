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

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card,
      });

      const paymentIntent = await this.stripe.paymentIntents.create({
        payment_method: paymentMethod.id,
        amount: amount * 100,
        confirm: true,
        payment_method_types: ['card'],
        currency: 'usd',
      });

      this.notificationsService.emit('notify_email', {
        email,
        text: `Your payment of $${amount} has completed successfully.`,
      });

      console.log('paymentIntent');
      console.log(paymentIntent);

      return paymentIntent;
    } catch (error) {
      console.log('error');
      console.log(error);
      console.error(error);
      throw new Error('Error creating payment intent');
    }
  }
}
