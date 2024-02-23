import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type driverDocument = driver & Document;

@Schema({ collection: 'driver' })

export class driver{

  @Prop()
  user_name: string;

  @Prop()
  password: string;

  @Prop()
  full_name: string;

  @Prop()
  phone_number: string;

  @Prop()
  rating: string;

  @Prop()
  model: string;

  @Prop()
  truck_type: string;

  @Prop()
  favor: number;

  @Prop()
  truck_plate: string;
  //
  @Prop()
  oderDone: number;
  
  @Prop()
  rejectShipment: number[];

  @Prop()
  occupy: number

  @Prop()
  done: number[];

  @Prop()
  gender: string;

  @Prop()
  birth: string;

  @Prop()
  birthPlace: string;

  @Prop()
  currentPlace: string;

  @Prop()
  citizenID: string;

  @Prop()
  IDDate: string;

  @Prop()
  IDPlace: string;

  @Prop()
  licenseID: string;

  @Prop()
  licenseType: string;

  @Prop()
  licenseDate: string;

  @Prop()
  licensePlace: string;

  @Prop()
  taxID: string;

  @Prop()
  bankID: string;

  @Prop()
  bankName: string;

  @Prop()
  user_id: number;
  
}

export const driverSchema = SchemaFactory.createForClass(driver);


