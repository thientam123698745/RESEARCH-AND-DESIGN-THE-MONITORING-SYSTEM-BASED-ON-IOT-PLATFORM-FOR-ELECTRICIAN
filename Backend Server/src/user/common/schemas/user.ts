import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { searchHistory } from './search_history'
import { voucher } from './voucher'

export type userDocument = user & Document;

@Schema({ collection: 'user' })
export class user {
  @Prop()
  user_name: string;
  @Prop()
  password: string;
  @Prop()
  full_name: string;
  @Prop()
  phone_number: string;
  @Prop()
  birth: Date;
  @Prop()
  gender: string;
  @Prop()
  nick_name: string;
  @Prop()
  avatar: string;
  @Prop()
  wallet_money: number;
  @Prop()
  role: string;
  @Prop()
  login_type: number;
  @Prop()
  login_id: string;
  @Prop()
  search_history: searchHistory[];
  @Prop()
  voucher: voucher[];
  @Prop()
  user_id: number;
}
export const userSchema = SchemaFactory.createForClass(user);


