import { Body, Controller, Get, Request, Post, Put, UseGuards, Query, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, BadRequestException, Res, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/local-auth.guard';
// import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { lookupService } from 'dns';
import { StringDecoder } from 'string_decoder';
import { CatsService } from './cats.service';
import { validateRule } from './dto/validate.dto';
import { validateRule2 } from './dto/validate.dto';
import { validateFullName } from './dto/validate.dto';
import { validatePassword } from './dto/validate.dto';
import { validateUserName } from './dto/validate.dto';
import { validatePhone } from './dto/validate.dto';
import { validateBirth } from './dto/validate.dto';
import { validateGender } from './dto/validate.dto';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, Cat18 } from './schemas/cats.schema';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard2 } from './auth2/jwt-auth2.guard';
import { LocalAuthGuard2 } from './auth2/local-auth.guard2';
import { AuthService2 } from './auth2/auth2.service';
import { JwtAuthGuard3 } from './auth3/jwt-auth3.guard';
import { LocalAuthGuard3 } from './auth3/local-auth.guard3';
import { AuthService3 } from './auth3/auth3.service';
import { Cat5, CatDocument5 } from './schemas/cats.schema';
import { Cat15, CatDocument15 } from './schemas/cats.schema';
import { Cat2, CatDocument2 } from './schemas/cats.schema';
import { Cat4, CatDocument4 } from './schemas/cats.schema';
import { Cat55, CatDocument55 } from './schemas/cats.schema';
import { Cat6, CatDocument6 } from './schemas/cats.schema';
import { Cat7, CatDocument7 } from './schemas/cats.schema';
import { Cat8, CatDocument8 } from './schemas/cats.schema';
import { Cat17, CatDocument17 } from './schemas/cats.schema';
import { Cat16, CatDocument16 } from './schemas/cats.schema';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
import axios from 'axios';
import { exec } from 'child_process';
import * as fs2 from 'fs-extra';
import { MessagesGateway } from '../messages/messages.gateway'
// import { JwtAuthGuard2 } from './auth2/jwt-auth2.guard';
// import { LocalAuthGuard2 } from './auth2/local-auth.guard2';
// import { AuthService2 } from './auth2/auth2.service';
import { catchError, firstValueFrom } from 'rxjs';
//@Controller(hello)
import { HttpService } from '@nestjs/axios';
import * as FormData from 'form-data';
@Injectable()
@Controller("/api")
export class CatsController {
  constructor(private readonly webSocketGateway: MessagesGateway,private readonly catsService: CatsService, private authService: AuthService,  private authService2: AuthService2,  private authService3: AuthService3) {}
  @InjectModel(Cat5.name) private readonly catModel5: Model<CatDocument5>
  @InjectModel(Cat8.name) private readonly catModel8: Model<CatDocument8>
  @InjectModel(Cat2.name) private readonly catModel2: Model<CatDocument2>
  @InjectModel(Cat16.name) private readonly catModel16: Model<CatDocument16>
  private readonly httpService: HttpService
  // @Post('emitMovingEvent')
  // emitMovingEvent(@Body() data: { state: number, driver_id: number, user_id: number, shipment_id: number }): void {
  //   // Assuming you want to emit the 'moving' event when this endpoint is called
  //   this.webSocketGateway.server.emit('recShipment', data);
  // }
  ///api/ShowRecord11
  @Post('testCall')
  async emitMovingEvent34(@Body() data: { isMoving: boolean, driver_id: number, latitude: string, longitude: string }): Promise<void> {
    try {
      const response = await axios.get('https://9319-14-161-38-9.ngrok-free.app/api/ShowRecord11', {
        headers: {
          'Content-Type': 'application/json', // Adjust content type if needed
          'ngrok-skip-browser-warning': 0,
        },})
      ;
      // Process the response.data here
      return response.data;
    } catch (error) {
      console.error('Axios error:', error.message);
      throw new HttpException('Unable to fetch data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('emitMovingEvent')
  emitMovingEvent(@Body() data: { isMoving: boolean, driver_id: number, latitude: string, longitude: string }): void {
    // Assuming you want to emit the 'moving' event when this endpoint is called
    this.webSocketGateway.server.emit('moving', data);
  }
  @Post('emitRecshipment')
  emitRecshipment(@Body() data: { state: boolean, driver_id: number, user_id: string, shipment_id: string }): void {
    // Assuming you want to emit the 'moving' event when this endpoint is called
    this.webSocketGateway.server.emit('recShipment', data);
  }
  @Post('emitMovingEvent2')
  async emitMovingEvent2(): Promise<any> {

    const inputDat2 = {isMoving: false,driver_id: 8,latitude: 4,longitude: 4} 
    try {
      const response = await axios.post('https://365truck.fdssoft.com/api/emitMovingEvent', inputDat2, {
        headers: {
          'Content-Type': 'application/json', // Adjust content type if needed
        },})
      ;
      // Process the response.data here
      return response.data;
    } catch (error) {
      console.error('Axios error:', error.message);
      throw new HttpException('Unable to fetch data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  // constructor(private readonly catsService: CatsService, private authService: AuthService) {}
  // @Get() 
  
  // async  getHello(@Query() query: { user_name: string, password: string,  }, @Request() req) {
  //   console.log( `User_name: ${query.user_name}`);
  //   console.log(`Password: ${query.password}`); 
  //   //return this.catsService.userExists(query.user_name);
  //   //return this.catsService.userExists(kew);
  //   var a = this.catsService.userExists(query.user_name);
  //   var b = this.catsService.userExists(query.password);
  //   var c = 0;
  //   c = await a + await b;
  //   if(c == 2)
  //   {
  //     //return 'well done'
  //     //return this.authService.login(req.user);
  //   } 
  // //@Request() req
    

  //   }
  // }
  


  

  // @UseGuards(LocalAuthGuard)
  // @Get('auth/loginUser') 
  // async  getHello123456(@Query() query: { user_name: string, password: string, }) {
  // console.log( `user_name: ${query.user_name}`);
  // console.log(`password: ${query.password}`); 
  // var a = this.catsService.userExists(query.user_name);
  // var b = this.catsService.userExists(query.password);
  // var c = 0;
  // c = await a + await b;
  //   if(c == 2)
  //   {
  //     return this.authService.login(query.user_name, query.password);
  //   } 
  // }
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/loginUser') 
  //async  getHello(@Query() query: { user_name: string, password: string, }, @Request() req) {
  //async  getHello(@Request() req: { user_name: string, password: string, }) {
    async  getHello(@Body() body: { user_name: string, password: string, }) {
    return this.authService.login(body.user_name, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('auth/logoutUser') 
  async  logoutUser(@Request() req) {
    //return this.catsService.userExists(query.user_name);
    //return this.catsService.userExists(kew);
    //return this.catsService.findOne(query.user_name);
    return 'User Logout Succesfully'
  }
    
  //   //return this.authService.login(req.user);
  //     //return 'well done'
  //     return this.authService.login(a,b);
  // //@Request() req
  // }

  
  @UsePipes(ValidationPipe)
  @Post('auth/regUser') 
  async  getHelo2(@Body() lovely: validateRule, @Body() body: {user_name: string, password: string, full_name: string, phone_number: string, birth: Date, gender: string, nick_name: string, avatar: string, wallet_money: number, role: string, login_type: number, login_id: string, search_history: Cat18, user_id: number}) {
    //body: validateRule;
    //console.log( `user_name: ${lovely.user_name}`);
    //body.user_name: lovely;
    console.log(`password: ${body.password}`); 
    //var ff = lovely.user_name
    return this.catsService.create(lovely.user_name, lovely.password, lovely.full_name, lovely.phone_number, body.birth, body.gender, body.nick_name, body.avatar, body.wallet_money, body.role, body.login_type, body.login_id, body.search_history, body.user_id);
    //return this.catsService.userExists(query.user_name);
    //return this.catsService.userExists(kew);
    //return this.catsService.findOne(query.user_name);
    //return this.catsService.create(lovely.user_name, body.password, lovely.full_name, lovely.phone_number, body.birth, body.gender, lovely.nick_name, body.avatar, body.wallet_money, body.role, body.login_type, body.login_id, body.user_id);
  }
//reg2 khong co check cac thong tin validate
  @Post('auth/regUser2') 
  async  getHello2(@Body() lovely: validateRule, @Body () body: {user_name: string, password: string, full_name: string, phone_number: string, birth: Date, gender: string, nick_name: string, avatar: string, wallet_money: number, role: string, login_type: number, login_id: string, search_history: Cat18, user_id: number}) {
    //body: validateRule;
    //console.log( `user_name: ${lovely.user_name}`);
    //body.user_name: lovely;
    console.log(`password: ${body.password}`); 
    //var ff = lovely.user_name
      return this.catsService.create(lovely.user_name, body.password, lovely.full_name, lovely.phone_number, body.birth, body.gender, body.nick_name, body.avatar, body.wallet_money, body.role, body.login_type, body.login_id, body.search_history, body.user_id);
    //return this.catsService.userExists(query.user_name);
    //return this.catsService.userExists(kew);
    //return this.catsService.findOne(query.user_name);
    
  }
  @UseGuards(JwtAuthGuard)
  @Post('getUser') 
    async  getHello9(@Body() query: { user_name: string}) {
      return this.catsService.findOne(query.user_name);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showUser') 
  async  showUser() {
    return this.catsService.findAll();
  }
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('updateUsername') 
  async  updateUsername(@Body() lovely: validateUserName, @Body() query: { user_id: number, user_name_new: string}) {
    return this.catsService.updateUsername(query.user_id,lovely.user_name_new);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('updateFullname') 
  async  updateFullname(@Body() lovely: validateFullName, @Body() query: { user_id: number, full_name_new: string}) {
    //console.log(query.full_name_new);
    console.log(query.user_id);
    return this.catsService.updateFullname(query.user_id,lovely.full_name_new);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('updatePhoneNumber') 
  async  updatePhoneNumber(@Body() lovely: validatePhone, @Body() query: { user_id: number, phone_number_new: string}) {
    return this.catsService.updatePhoneNumber(query.user_id,lovely.phone_number_new);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('updateBirth') 
  async  updateBirth(@Body() lovely: validateBirth, @Body() query: { user_id: number, birth_new: Date}) {
    return this.catsService.updateBirth(query.user_id,lovely.birth_new);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('updateGender') 
  async  updateGender(@Body() lovely: validateGender, @Body() query: { user_id: number, gender_new: string}) {
    return this.catsService.updateGender(query.user_id,lovely.gender_new);
  }
  @UseGuards(JwtAuthGuard)
  @Put('updateNickName') 
  async  updateNickName(@Body() query: { user_id: number, nick_name_new: string}) {
    return this.catsService.updateNickName(query.user_id,query.nick_name_new);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('updateAvatar') 
  async  updateAvatar(@Body() query: { user_id: number, avatar_new: string}) {
    return this.catsService.updateAvatar(query.user_id,query.avatar_new);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('updatePassword') 
  async  updatePassword(@Body() lovely: validatePassword, @Body() query: { user_id: number, password: string, password_new: string}) {
    return this.catsService.updatePassword(query.user_id, query.password, lovely.password_new);
  }
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('updateFull') 
  async  updateFull(@Body() lovely: validatePassword, @Body() lovely2: validateUserName, @Body() lovely3: validateFullName, @Body() lovely5: validateBirth, @Body() lovely6: validateGender
  , @Body() query: { user_id: number, user_name_new: string, full_name_new: string, birth_new: Date, gender_new: string, nick_name_new: string, avatar_new: string}) {
    return this.catsService.updateFull(query.user_id, lovely2.user_name_new, lovely3.full_name_new, lovely5.birth_new, lovely6.gender_new, query.nick_name_new, query.avatar_new);
  }
  @Get('compare') 
  async  returnJson(@Body() query: { a: string, b: string}) {
    return this.catsService.returnJson(query.a,query.b);
  }
  @Get('deleteUser') 
  async  deleteUser(@Body() query: { user_id: number}) {
    return this.catsService.deleteUser(query.user_id);
  }
  @UsePipes(ValidationPipe)
  @Post('validate') 
  async  getHelo267( @Body() lovely: validateRule, @Body() body: {user_name: string, password: string, full_name: string, phone_number: string}) {
    console.log(`password: ${body.password}`); 
    return this.catsService.validate(lovely.user_name, lovely.password, lovely.full_name, lovely.phone_number);
  }
  @UsePipes(JwtAuthGuard)
  @Get('checkOTP') 
  async  CheckOTP(@Body() query: { OTP: string}) {
    return this.catsService.OTPcheck(query.OTP);
  }
  @UseGuards(JwtAuthGuard)
  @Post('createHistory') 
  async  getHello111(@Body() query: { content: string, length: number, detail: string, user_id: number}) {
    return this.catsService.create18(query.content, query.length, query.detail, query.user_id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getHistory') 
    async  getHello222(@Body() query: { content: string}) {
      return this.catsService.findOne18(query.content);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showHistory') 
  async  getHello333() {
    return this.catsService.findAll18();
  }
  @UseGuards(JwtAuthGuard)
  @Post('deleteHistory') 
    async  getHello444(@Body() query: { content: string}) {
      return this.catsService.delete18(query.content);
  }
  @UseGuards(JwtAuthGuard)
  @Post('createShipmentDriver') 
  async  getHello112(@Body() query: { shipment_id: number, user_id: number}) {
    return this.catsService.create17(query.shipment_id, query.user_id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('showShipmentDriver') 
  async  show017() {
    return this.catsService.show17();
  }
  @UseGuards(JwtAuthGuard)
  @Post('updateShipmentDriver') 
  async  getHello1212(@Body() query: { shipment_id: number, user_id: number, rating: number}) {
    return this.catsService.update17(query.shipment_id, query.user_id, query.rating);
  }
  @UseGuards(JwtAuthGuard)
  @Post('updateShipmentDriverState') 
  async  update0170(@Body() query: { shipment_id: number, user_id: number, new_state: number}) {
    return this.catsService.update170(query.shipment_id, query.user_id, query.new_state);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getShipmentDriver') 
  async getHello531(@Body() query: { shipmentDriverId: number}) {
      return this.catsService.findOne17(query.shipmentDriverId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showShipmentDriver') 
  async  getHello334() {
    return this.catsService.findAll17();
  }
  @UseGuards(JwtAuthGuard)
  @Get('deleteShipmentDriver') 
    async  getHello443(@Body() query: { shipmentDriverId: number}) {
      return this.catsService.delete17(query.shipmentDriverId);
  }
  @UseGuards(LocalAuthGuard2)
  @Post('auth/loginDriver') 
    async  getHello7(@Body() body: { phone_number: string, password: string, }) {
    // let user_name = body.phone;
    // console.log(user_name);
    // console.log(body.phone);
    return this.authService2.login2(body.phone_number, body.password);
  }

  // @UseGuards(LocalAuthGuard)
  // @Get('auth/loginDriver') 
  // async  getHello7(@Query() query: { user_name: string, password: string, }, @Request() req) {
  //   console.log( `user_name: ${query.user_name}`);
  //   console.log(`password: ${query.password}`); 
  //   var a = this.catsService.userExists2(query.user_name);
  //   var b = this.catsService.userExists2(query.password);
  //   var c = 0;
  //   c = await a + await b;
  //   if(c == 2){
  //     //return this.authService.login(query.user_name, query.password);
  //   } 
  // }
  // @UseGuards(LocalAuthGuard)
  // @Get('auth/loginDriver') 
  // async  getHello67(@Body() body: { user_name: string, password: string, }) {
  //   return this.authService.login(body.user_name, body.password);
  // }
  //@UseGuards(LocalAuthGuard2)
  @UsePipes(ValidationPipe)
  //@UseGuards(JwtAuthGuard2)
  @Get('auth/regDriver') 
    async  getHello3(@Body() lovely: validateRule2, @Body() query: {user_name: string, password: string, full_name: string, phone_number: string, rating: string, 
      model: string, truck_type: string, distance: number, favor: number, truck_plate: string, 
      gender: string, birth: string, birthPlace: number, currentPlace: string, citizenID: string,
      IDDate: string, IDPlace: string, licenseID: number, licenseType: string, licenseDate: string,
      licensePlace: string, taxID: string, bankID: number, bankName: string}) {
      console.log( `user_name: ${query.user_name}`);
      console.log(`password: ${query.password}`); 
      return this.catsService.create2(query.user_name, query.password, query.full_name, query.phone_number, query.rating,
         query.model, query.truck_type, query.distance, query.favor, query.truck_plate,
         query.gender,
         query.birth,
         query.birthPlace,
         query.currentPlace,
         query.citizenID,
         query.IDDate,
         query.IDPlace,
         query.licenseID,
         query.licenseType,
         query.licenseDate,
         query.licensePlace,
         query.taxID, 
         query.bankID,
         query.bankName,);
  }
  @UseGuards(JwtAuthGuard2)
  @Post('getDriver') 
    async  getHello4(@Body() query: { phone_number: string}) {
      return this.catsService.findOne2(query.phone_number);
  }
  @Get('showDriver') 
  async  showDriver() {
    let k = '1';
    console.log(k);
    return this.catsService.findAll2();
  }
  @UseGuards(JwtAuthGuard)
  @Post('deleteDriver') 
  async  deleteDriver(@Body() query: {driver_id: number}) {
    return this.catsService.delete2(query.driver_id);
  }
  // @Get('modifyDriver') 
  // async  modifyDriver(@Body() query: { distanceNew: number[], typeTruckNew: string[]}) {
  //   return this.catsService.modifyDriver(query.distanceNew, query.typeTruckNew);
  // }
  // @Get('modifyDriver2') 
  // async  modifyDriver2(@Query() query: { distanceNew: number[], typeTruckNew: string[]}) {
  //   return this.catsService.modifyDriver(query.distanceNew, query.typeTruckNew);
  // }
  // @Get('findDriver') 
  // async  findDriver(@Body() query: {shipment_id: number, latPick: number, longPick: number, typeTruckNew: string[], latDriver: number[], longDriver: number[]}) {
  //   return this.catsService.findDriver(query.shipment_id, query.latPick, query.longPick, query.typeTruckNew, query.latDriver, query.longDriver);
  // }
  @Post('findAllPathFromInput') 
  async  findAllPathFromInput(@Body() query: {lat: number, long: number}) {
    return this.catsService.findAllPathFromInput(query.lat, query.long);
  }
  @Post('findDriverFinal') 
  async  findDriverFinal(@Body() query: {shipment_id: number}) {
    return this.catsService.findDriverFinal(query.shipment_id);
  }
  @Get('pathFinder') 
  async  pathFinder(@Body() query: {lat: number[], long: number[]}) {
    return this.catsService.pathFinder(query.lat, query.long);
  }
  @Get('pathFinderHandmade') 
  async  pathFinderHandmade(@Body() query: {lat: number[], long: number[]}) {
    return this.catsService.pathFinderHandmade(query.lat, query.long);
  }
  @Post('pathFinderFinal') 
  async  pathFinderFinal(@Body() query: {lat: number[], long: number[]}) {
    return this.catsService.pathFinderFinal(query.lat, query.long);
  }
  @Get('testArray') 
  async  testArray(@Query() query: { a: number[]}) {
    return this.catsService.testArray(query.a);
  }
  @UseGuards(JwtAuthGuard)
  @Get('auth/regCustomer') 
    async  getHello11(@Query() query: { full_name: string, phone_number: string, location: string, types: string, notes: string, user_id: number}) {
      return this.catsService.create3(query.full_name, query.phone_number, query.location, query.types, query.notes, query.user_id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getCustomer') 
    async  getHello22(@Query() query: { phone_number: string}) {
      return this.catsService.findOne3(query.phone_number);
  }
  @UseGuards(JwtAuthGuard)
  @Get('createTime') 
  async  getHello33(@Query() query: { date: string, time: string}) {
    return this.catsService.create4(query.date, query.time);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getTime') 
    async  getHello44(@Query() query: { time: string}) {
      return this.catsService.findOne4(query.time);
  }
//   @UseGuards(JwtAuthGuard)
//   @Get('pushTime') 
//   async  getHello00(@Query() query: { time: string, abc: string}) {
//     return this.catsService.Push4(query.time, query.abc);
// }

  //@UseGuards(JwtAuthGuard)
  @Get('showTime') 
  async  getHello55() {
    return this.catsService.findAll4();
  }
  @UseGuards(JwtAuthGuard)
  @Get('createPackageType') 
  async  getHello66(@Body() query: { types: string, image: string}) {
    return this.catsService.create5(query.types, query.image);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getPackageType') 
    async  getHello77(@Body() query: { types: string}) {
      return this.catsService.findOne5(query.types);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showPackageType') 
  async  getHello88() {
    return this.catsService.findAll5();
  }
  @UseGuards(JwtAuthGuard)
  @Get('deletePackageType') 
    async  getHello717(@Body() query: { types: string}) {
      return this.catsService.delete5(query.types);
  }
  @UseGuards(JwtAuthGuard)
  @Get('createPackageType2') 
  async  getHello0066(@Body() query: { types: string, image: string}) {
    return this.catsService.create005(query.types, query.image);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getPackageType2') 
    async  getHello0077(@Body() query: { types: string}) {
      return this.catsService.findOne005(query.types);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showPackageType2') 
  async  getHello0088() {
    return this.catsService.findAll005();
  }
  @UseGuards(JwtAuthGuard)
  @Get('deletePackageType2') 
    async  getHello00717(@Body() query: { types: string}) {
      return this.catsService.delete005(query.types);
  }
  @UseGuards(JwtAuthGuard)
  @Get('createManual') 
  async  getHello661(@Body() query: { manual: string, image: string}) {
    return this.catsService.create55(query.manual, query.image);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getManual') 
    async  getHello771(@Body() query: { manual: string}) {
      return this.catsService.findOne55(query.manual);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showManual') 
  async  getHello881() {
    return this.catsService.findAll55();
  }
  @UseGuards(JwtAuthGuard)
  @Get('deleteManual') 
    async  getHello7127(@Body() query: { manual: string}) {
      return this.catsService.delete55(query.manual);
  }
  @UseGuards(JwtAuthGuard)
  @Get('createWeight') 
  async  getHello99(@Body() query: { weight: number, length: number, width: number, height: number}) {
    return this.catsService.create6(query.weight, query.length, query.width, query.height);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getWeight') 
    async  getHello12(@Body() query: { weight: number}) {
      return this.catsService.findOne6(query.weight);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showWeight') 
  async  getHello13() {
    return this.catsService.findAll6();
  }
  @UseGuards(JwtAuthGuard)
  @Get('deleteWeight') 
    async  getHello013(@Body() query: { weight: string}) {
      return this.catsService.delete6(query.weight);
  }
  @UseGuards(JwtAuthGuard)
  @Get('createWeight2') 
  async  getHello0099(@Body() query: { weight: number, length: number, width: number, height: number}) {
    return this.catsService.create006(query.weight, query.length, query.width, query.height);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getWeight2') 
    async  getHello012(@Body() query: { weight: number}) {
      return this.catsService.findOne006(query.weight);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showWeight2') 
  async  getHello00013() {
    return this.catsService.findAll006();
  }
  @UseGuards(JwtAuthGuard)
  @Get('deleteWeight2') 
    async  getHello0013(@Body() query: { weight: string}) {
      return this.catsService.delete006(query.weight);
  }
  @UseGuards(JwtAuthGuard)
  @Get('createTruckTypes') 
  async  getHello14(@Body() query: {truck_types: string, weight: number, length: number, width: number, height: number, image: string, description: string, weight2: string}) {
    return this.catsService.create7(query.truck_types, query.weight, query.length, query.width, query.height, query.image, query.description, query.weight2);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getTruckTypes') 
    async  getHello15(@Body() query: { truck_types: string}) {
      return this.catsService.findOne7(query.truck_types);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showTruckTypes') 
  async  getHello16() {
    return this.catsService.findAll7();
  }
  @UseGuards(JwtAuthGuard)
  @Get('deleteTruckTypes') 
    async  getHello747(@Body() query: { truck_types: string}) {
      return this.catsService.delete7(query.truck_types);
  }
  @UseGuards(JwtAuthGuard)
  @Get('updateTruckTypes') 
    async  update07(@Body() query: { truck_types: string, description: string, weight2: string}) {
      return this.catsService.update7(query.truck_types, query.description, query.weight2);
  }
  @UseGuards(JwtAuthGuard)
  @Get('createTruckTypes2') 
  async  getHello0014(@Body() query: {truck_types: string, weight: number, length: number, width: number, height: number, image: string, description: string, weight2: string}) {
    return this.catsService.create007(query.truck_types, query.weight, query.length, query.width, query.height, query.image, query.description, query.weight2);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getTruckTypes2') 
    async  getHello0015(@Body() query: { truck_types: string}) {
      return this.catsService.findOne007(query.truck_types);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showTruckTypes2') 
  async  getHello0016() {
    return this.catsService.findAll007();
  }
  @UseGuards(JwtAuthGuard)
  @Get('deleteTruckTypes2') 
    async  getHello00747(@Body() query: { truck_types: string}) {
      return this.catsService.delete007(query.truck_types);
  }
  @UseGuards(JwtAuthGuard)
  @Get('updateTruckTypes2') 
    async  update0007(@Body() query: { truck_types: string, description: string, weight2: string}) {
      return this.catsService.update007(query.truck_types, query.description, query.weight2);
  }
  @UseGuards(JwtAuthGuard)
  @Post('createShipment') 
  async  getHello21(@Body() query: {senderName: string, senderPhone: string, recAddress: Cat15[], senderAddress: Cat15[], driver: Cat17[], time: Date, typeOfShipment: string, manual: string, size: Cat6, trucks: Cat7[], payment: string, fee: string, voucher: number, user_id: number}) {
    return this.catsService.create8(query.senderName, query.senderPhone, query.recAddress, query.senderAddress, query.driver, query.time, query.typeOfShipment, query.manual, query.size, query.trucks, query.payment, query.fee, query.voucher, query.user_id);
  }//async create8(shipment_info: string, sender: string, senderAdress: string[], recAdress: string[], recFloor: string[], recDeliverNotes: string[], recName: string[], recPhone: string[], recDriverNotes: string[], pickup_time: string, type: string, manual: string,  weight: number, length: number, width: number, height: number, payment: string, fee: string, shipment_id: number){
  @UseGuards(JwtAuthGuard)
  @Post('getShipment') 
  async  getHello24(@Body() query: { id: number}) {
    return this.catsService.findOne8(query.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showShipment') 
  async  getHello23() {
    return this.catsService.findAll8();
  }
  @UseGuards(JwtAuthGuard2)
  @Get('showShipment2') 
  async  getHello023() {
    return this.catsService.findAll8();
  }
  @UseGuards(JwtAuthGuard2)
  @Post('getShipment2') 
  async  getHello2674(@Body() query: { id: number}) {
    return this.catsService.findOne8(query.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('updateShipmentPayment') 
  async  getHello240(@Body() query: { shipment_id: number, payment: string}) {
    return this.catsService.update8(query.shipment_id, query.payment);
  }
  @UseGuards(JwtAuthGuard2)
  @Post('updateShipmentPayment2') 
  async  getHello2402(@Body() query: { shipment_id: number, payment: string}) {
    return this.catsService.update8(query.shipment_id, query.payment);
  }
  @UseGuards(JwtAuthGuard)
  @Post('deleteShipment') 
    async  deleteShipment(@Body() query: { shipment_id: number}) {
      return this.catsService.delete8(query.shipment_id);
  }
  //@UseGuards(JwtAuthGuard)
  @Get('createShipment2') 
  async  getHello221(@Body() query: {recAddress: Cat15[]}) {
    return this.catsService.create89(query.recAddress);
  }//async create8(shipment_info: string, sender: string, senderAdress: string[], recAdress: string[], recFloor: string[], recDeliverNotes: string[], recName: string[], recPhone: string[], recDriverNotes: string[], pickup_time: string, type: string, manual: string,  weight: number, length: number, width: number, height: number, payment: string, fee: string, shipment_id: number){
  @UseGuards(JwtAuthGuard)
  @Get('getShipment2') 
    async  getHello224(@Body() query: { id: number}) {
      return this.catsService.findOne89(query.id);
  }
  // @UseGuards(JwtAuthGuard)
  // @Get('showShipment2') 
  // async  getHello223() {
  //   return this.catsService.findAll98();
  // }
  @UseGuards(JwtAuthGuard)
  @Get('createTruckSell') 
  async  getHello10(@Query() query: { truck_state: string, truck_state_id, truck_brand, truck_name: string, price: string, distance: string, picture: string, truck_id: number}) {
    return this.catsService.create9(query.truck_state, query.truck_state_id, query.truck_brand, query.truck_name, query.price, query.distance, query.picture, query.truck_id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('truckSellFilter') 
    async  getHello30(@Query() query: { truck_state_id: string}) {
      return this.catsService.filter(query.truck_state_id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('showTruckSell') 
  async  getHello20() {
    return this.catsService.findAll9();
  }
  @UseGuards(JwtAuthGuard)
  @Get('truckSellPaginate') 
  async  getHello40(@Query() query: {truck_state_id: string, pagination: number}) {
    return this.catsService.paginate(query.truck_state_id, query.pagination);
  }
  @UseGuards(JwtAuthGuard)
  @Post('chooseTruckLogic') 
  async  chooseTruckLogic(@Body() query: {weight: number, length: number, width: number, height: number}) {
    return this.catsService.chooseTruckLogic(query.weight, query.length, query.width ,query.height);
  }
  @UseGuards(JwtAuthGuard)
  @Post('truckLogicFinal') 
  async  truckLogicFinal(@Body() query: {amount: number, weight: number, length: number, width: number, height: number}) {
    return this.catsService.chooseTruckLogicFinal(query.amount, query.weight, query.length, query.width ,query.height);
  }
  @UseGuards(JwtAuthGuard)
  @Get('maxTruck') 
  async  maxTruck() {
    return this.catsService.maxTruck();
  }
  @Get('testLogic') 
  async  testLogic(@Query() query: {weight: number, length: number, width: number, height: number}) {
    return this.catsService.testLogic(query.weight, query.length, query.width ,query.height);
  }
  //@UseGuards(JwtAuthGuard)
  @Get('createTime2') 
  async  getHellooo(@Query() query: { date: string, time: string}) {
    return this.catsService.create10(query.date, query.time);
  }
  //@UseGuards(JwtAuthGuard)
  @Get('getTime2') 
    async  getHello4o(@Query() query: { time: string}) {
      return this.catsService.findOne10(query.time);
  }
//   @UseGuards(JwtAuthGuard)
//   @Get('pushTime') 
//   async  getHello00(@Query() query: { time: string, abc: string}) {
//     return this.catsService.Push4(query.time, query.abc);
// }

  //@UseGuards(JwtAuthGuard)
  @Get('showTime2') 
  async  getHello552() {
    return this.catsService.findAll10();

  }

    //@UseGuards(JwtAuthGuard)
  @Get('dispatch') 
  async  dispatch(@Query() query: {date12: string, time12: string}) {
    return this.catsService.dispatch(query.date12, query.time12);
  }

  @Get('dispatch2') 
  async  dispatch2(@Query() query: {date12: string, time12: string}) {
    return this.catsService.dispatch2(query.date12, query.time12);
  }

  @Get('dispatch3') 
  async  dispatch3(@Query() query: {time12: string}) {
    return this.catsService.dispatch3(query.time12);
  }

    //@UseGuards(JwtAuthGuard)
    @Get('createTime3') 
    async  createTime3(@Query() query: { date: string, time: string, number: number}) {
      return this.catsService.create11(query.date, query.time, query.number);
    }
    //@UseGuards(JwtAuthGuard)
    @Get('getTime3') 
      async  getTime3(@Query() query: { time: string}) {
        return this.catsService.findOne11(query.time);
    }
  //   @UseGuards(JwtAuthGuard)
  //   @Get('pushTime') 
  //   async  getHello00(@Query() query: { time: string, abc: string}) {
  //     return this.catsService.Push4(query.time, query.abc);
  // }
  
    //@UseGuards(JwtAuthGuard)
    @Get('showTime3') 
    async  showTime3() {
      return this.catsService.findAll11();
    }
  
    @Get('findArray') 
    async  findArray(@Query() query: {date123: string}) {
      return this.catsService.showArray(query.date123);
    }

    @Get('modify') 
    async  modify(@Query() query: {number123: number}) {
      return this.catsService.modify(query.number123);
    }

    @Get('testMin') 
    async  testMin() {
      return this.catsService.testMin();
    }

    @Get('findBig') 
    async  fingBig0(@Query() query: { number123: number}) {
      return this.catsService.findBig(query.number123);
  
    }
      //@UseGuards(JwtAuthGuard)
    // @Get('dispatch') 
    // async  dispatch(@Query() query: {date12: string, time12: string}) {
    //   return this.catsService.dispatch(query.date12, query.time12);
    // }
    //@UseGuards(JwtAuthGuard)
    @Get('createImage') 
    async  createImage(@Query() query: {name: string, image: string}) {
      return this.catsService.create12(query.name, query.image);
    }
    //@UseGuards(JwtAuthGuard)
    @Get('getImage') 
      async  getImage(@Query() query: { name: string}) {
        return this.catsService.findOne12(query.name);
    }
    //@UseGuards(JwtAuthGuard)
    @Get('showImages') 
    async  showImages() {
      return this.catsService.findAll12();
    }

    @Get('createImage2') 
    async  createImage2(@Query() query: {name: string, image: string}) {
      return this.catsService.create13(query.name, query.image);
    }
    //@UseGuards(JwtAuthGuard)
    @Get('getImage2') 
      async  getImage2(@Query() query: { name: string}) {
        return this.catsService.findOne13(query.name);
    }
    //@UseGuards(JwtAuthGuard)
    @Get('showImages2') 
    async  showImages2() {
      return this.catsService.findAll13();
    }

    @Get('createDriverDistance') 
    async  createDistance(@Query() query: { address: string, distance: number[], truck_types: string[]}) {
      return this.catsService.create14(query.address, query.distance, query.truck_types);
    }
    //@UseGuards(JwtAuthGuard)
    @Get('getDriverDistance') 
      async  getDistance(@Query() query: { address: string}) {
        return this.catsService.findOne14(query.address);
    }

    @Get('showDriverDistance') 
    async  showDriverDistance() {
      return this.catsService.findAll14();
    }

    @Get('dijkstra') 
    async  dijkstra() {
      return this.catsService.dijkstra();
    }

    @Get('dijkstra3') 
    async  dijkstra3() {
      return this.catsService.dijkstra3();
    }

    @Get('deleteAllTest') 
    async  delete99() {
      return this.catsService.delete99();
    }

    @Get('createTest') 
    async  getHello6434346(@Body() query: { recAddress: Cat15[], senderAddress: Cat5, weight: number, dateTest: Date}) {
      return this.catsService.create99(query.recAddress, query.senderAddress, query.weight, query.dateTest);
    }

    @Get('createTest999') 
    async  create999(@Body() query: { recAddress: Cat15[], senderAddress: Cat5, weight: number, dateTest: Date}) {
      return this.catsService.create999(query.recAddress, query.senderAddress, query.weight, query.dateTest);
    }

    @Get('showTests') 
    async  dijkstra343() {
      return this.catsService.findAll1232();
    }

    @Get('pushArray') 
    async  pushArray() {
      return this.catsService.pushArray();
    }

    @UseGuards(JwtAuthGuard)
    @Get('createAds') 
    async  getHello113(@Body() query: { content: string, image: string}) {
      return this.catsService.create19(query.content, query.image);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getAds') 
      async  get19(@Body() query: { content: string}) {
        return this.catsService.findOne19(query.content);
    }
    @UseGuards(JwtAuthGuard)
    @Get('showAds') 
    async  show19() {
      return this.catsService.findAll19();
    }
    @UseGuards(JwtAuthGuard)
    @Get('deleteAds') 
      async  delete019(@Body() query: { content: string}) {
        return this.catsService.delete19(query.content);
    }
    @UseGuards(JwtAuthGuard)
    @Get('createTruckAds') 
    async  create020(@Body() query: { content: string, image: string}) {
      return this.catsService.create20(query.content, query.image);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getTruckAds') 
      async  get020(@Body() query: { content: string}) {
        return this.catsService.findOne20(query.content);
    }
    @UseGuards(JwtAuthGuard)
    @Get('showTruckAds') 
    async  show020() {
      return this.catsService.findAll20();
    }
    @UseGuards(JwtAuthGuard)
    @Get('deleteTruckAds') 
      async  delete020(@Body() query: { content: string}) {
        return this.catsService.delete20(query.content);
    }
    @UseGuards(JwtAuthGuard)
    @Get('createBrandAds') 
    async  create021(@Body() query: { brand: string, image: string}) {
      return this.catsService.create21(query.brand, query.image);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getBrandAds') 
      async  get021(@Body() query: { brand: string}) {
        return this.catsService.findOne21(query.brand);
    }
    @UseGuards(JwtAuthGuard)
    @Get('showBrandAds') 
    async  show021() {
      return this.catsService.findAll21();
    }
    @UseGuards(JwtAuthGuard)
    @Get('deleteBrandAds') 
      async  delete021(@Body() query: { brand: string}) {
        return this.catsService.delete21(query.brand);
    }
    @UseGuards(JwtAuthGuard)
    @Get('createAddress') 
    async  create015(@Body() query: { coord: Cat16, shortAddress: string, detailAddress: string, apartmentFloor: string, noteAddress: string, name: string, phone: string, noteForDriver: string, role: string, shipmentID: number, id: number}) {
  
      return this.catsService.create323(query.coord, query.shortAddress, query.detailAddress, query.apartmentFloor, query.noteAddress, query.name, query.phone, query.noteForDriver, query.role, query.shipmentID, query.id);
    }
    // @UseGuards(JwtAuthGuard)
    // @Get('getBrandAds') 
    //   async  get021(@Body() query: { brand: string}) {
    //     return this.catsService.findOne21(query.brand);
    // }
    @UseGuards(JwtAuthGuard)
    @Get('showAddress') 
    async  show015() {
      return this.catsService.findAll122332();
    }
    // @UseGuards(JwtAuthGuard)
    // @Get('deleteBrandAds') 
    //   async  delete021(@Body() query: { brand: string}) {
    //     return this.catsService.delete21(query.brand);
    // }
    @UseGuards(JwtAuthGuard)
    @Get('createVoucher') 
    async  create022(@Body() query: { content: string, image: string}) {
      return this.catsService.create22(query.content, query.image);
    }
    @UseGuards(JwtAuthGuard)
    @Get('pushVoucher') 
    async  pushVoucher(@Body() query: { voucher_id: number, user_id: number}) {
      return this.catsService.pushVoucher(query.voucher_id, query.user_id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getVoucher') 
      async  get022(@Body() query: { content: string}) {
        return this.catsService.findOne22(query.content);
    }
    @UseGuards(JwtAuthGuard)
    @Get('showVoucher') 
    async  show022() {
      return this.catsService.findAll22();
    }
    @UseGuards(JwtAuthGuard)
    @Get('deleteVoucher') 
      async  delete022(@Body() query: { content: string}) {
        return this.catsService.delete22(query.content);
    }
    @UseGuards(JwtAuthGuard)
    @Get('createRealCoor') 
      async  create025(@Body() query: { driver_id: number, latitude: number, longtitude: number, id_realCoor: number}) {
        return this.catsService.create25(query.driver_id, query.latitude, query.longtitude, query.id_realCoor);
    }
    @UseGuards(JwtAuthGuard)
    @Get('findAllRealCoor') 
      async  find025() {
        return this.catsService.findAll25();
    }
    @UseGuards(JwtAuthGuard)
    @Get('updateRealCoor') 
      async  update025(@Body() query: { driver_id: number, latitude: number, longtitude: number}) {
        return this.catsService.update25(query.driver_id, query.latitude, query.longtitude);
    }
    //@UseGuards(JwtAuthGuard)
    @Get('createMessages') 
    async  create023(@Body() query: { message: string, sender: string, recipient: string}) {
      return this.catsService.create23(query.message, query.sender, query.recipient);
    }
    @Get('findAllMessages') 
      async  findAll023() {
        return this.catsService.findAll23();
    }
    @Get('updateMessages') 
    async  updatel23(@Body() query: { sender: string, message: string}) {
      return this.catsService.updatel23(query.sender, query.message);
    }
    @UseGuards(JwtAuthGuard)
    @Get('createCoord') 
    async  create016(@Body() query: { latitude: number, longtitude: number, favorable: number, driver_id: number}) {
      return this.catsService.createCord(query.latitude, query.longtitude, query.favorable, query.driver_id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getCoord') 
      async  get016(@Body() query: { driver_id: number}) {
        return this.catsService.findOneCord(query.driver_id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('showCoord') 
    async  show016() {
      return this.catsService.findAllCord();
    }
    @UseGuards(JwtAuthGuard)
    @Get('deleteCoord') 
      async  delete016(@Body() query: { driver_id: number}) {
        return this.catsService.deleteCord(query.driver_id);
    }
    @UseGuards(JwtAuthGuard2)
    @Post('updateCoord') 
    async  update016(@Body() query: { driver_id: number, latitude: number, longtitude: number}) {
      return this.catsService.updateCord(query.driver_id, query.latitude, query.longtitude);
    }
    @UseGuards(JwtAuthGuard)
    @Get('createStatus') 
    async  create026(@Body() query: { status: number, content: string, detail: string}) {
      return this.catsService.createStatus(query.status, query.content, query.detail);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getStatus') 
      async  get026(@Body() query: { status: number}) {
        return this.catsService.findOneStatus(query.status);
    }
    @UseGuards(JwtAuthGuard)
    @Get('showStatus') 
    async  show026() {
      return this.catsService.findAllStatus();
    }
    @UseGuards(JwtAuthGuard)
    @Get('deleteStatus') 
      async  delete026(@Body() query: { status: number}) {
        return this.catsService.deleteStatus(query.status);
    }
    @UseGuards(JwtAuthGuard)
    @Get('updateStatus') 
    async  update026(@Body() query: { status: number, content: string, detail: string}) {
      return this.catsService.updateStatus(query.status, query.content, query.detail);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getNextStatus') 
    async  next026(@Body() query: { status: number}) {
      return this.catsService.getNextStatus(query.status);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getSelectDriver') 
    async  get027(@Body() query: { shipment_id: number}) {
      return this.catsService.findOneSelectDriver(query.shipment_id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('showSelectDriver') 
    async  show027() {
      return this.catsService.findAllSelectDriverr();
    }
    @UseGuards(JwtAuthGuard)
    @Get('deleteSelectDriver') 
      async  delete027(@Body() query: { shipment_id: number}) {
        return this.catsService.deleteSelectDriver(query.shipment_id);
    }
    @UseGuards(JwtAuthGuard)
    @Get('shipmentRejection') 
      async  shipmentRejection(@Body() query: { shipment_id: number, user_id: number}) {
        return this.catsService.shipmentRejection(query.shipment_id, query.user_id);
    }

    @Post('auth/regAdmin') 
    async  reg028(@Body() lovely: {user_name: string, password: string, full_name: string, phone_number: string, birth: Date, gender: string}) {
      console.log(`password: ${lovely.password}`); 

      return this.catsService.create28(lovely.user_name, lovely.password, lovely.full_name, lovely.phone_number, lovely.birth, lovely.gender);
    }
    @UseGuards(LocalAuthGuard3)
    @Post('auth/loginAdmin') 
    //async  getHello(@Query() query: { user_name: string, password: string, }, @Request() req) {
    //async  getHello(@Request() req: { user_name: string, password: string, }) {
    async  login028(@Body() body: { user_name: string, password: string, }) {
      return this.authService3.login3(body.user_name, body.password);
    }
    @UseGuards(JwtAuthGuard3)
    @Get('showAdmin') 
    async  show028() {
      return this.catsService.findAll28();
    }
    @Get('showAdmin2') 
    async  show0282() {
      return this.catsService.findAll28();
    }
    @UseGuards(JwtAuthGuard3)
    @Get('deleteAdmin') 
    async  delete028(@Body() query: { admin_id: number}) {
      return this.catsService.deleteUser28(query.admin_id);
    }
    @UseGuards(JwtAuthGuard3)
    @Get('showUserAdmin') 
    async  showUser028() {
      return this.catsService.findAll();
    }
    @UseGuards(JwtAuthGuard3)
    @Get('showDriverAdmin') 
    async  showDriver028() {
      let k = '1';
      console.log(k);
      return this.catsService.findAll2();
    }
    @UseGuards(JwtAuthGuard3)
    @Post('createShipmentAdmin') 
    async  getHello28(@Body() query: {senderName: string, senderPhone: string, recAddress: Cat15[], senderAddress: Cat15[], driver: Cat17[], time: Date, typeOfShipment: string, manual: string, size: Cat6, trucks: Cat7[], payment: string, fee: string, voucher: number, user_id: number}) {
      return this.catsService.create8(query.senderName, query.senderPhone, query.recAddress, query.senderAddress, query.driver, query.time, query.typeOfShipment, query.manual, query.size, query.trucks, query.payment, query.fee, query.voucher, query.user_id);
    }
    @UseGuards(JwtAuthGuard3)
    @Post('getShipmentAdmin') 
      async  getHello2428(@Body() query: { id: number}) {
        return this.catsService.findOne8(query.id);
    }
    @UseGuards(JwtAuthGuard3)
    @Get('showShipmentAdmin') 
    async  getHello2328() {
      return this.catsService.findAll8();
    }
    @UseGuards(JwtAuthGuard3)
    @Post('auth/regUserAdmin') 
    async  getHelo228(@Body() lovely: validateRule, @Body() body: {user_name: string, password: string, full_name: string, phone_number: string, birth: Date, gender: string, nick_name: string, avatar: string, wallet_money: number, role: string, login_type: number, login_id: string, search_history: Cat18, user_id: number}) {
      console.log(`password: ${body.password}`); 
      return this.catsService.create(lovely.user_name, lovely.password, lovely.full_name, lovely.phone_number, body.birth, body.gender, body.nick_name, body.avatar, body.wallet_money, body.role, body.login_type, body.login_id, body.search_history, body.user_id);
    }
    @UseGuards(JwtAuthGuard3)
    @Post('createProduct') 
    async  getHello29(@Body() query: {Manufacturer: string, Product_Category: string, Series: string, Product: string, Core: string, 
      RF_Frequency: string, Brand: string, Data_Bus_Width: string, Interface_Type: string, Operating_Supply_Voltage: string,
      Unit_Weight: string}) {
      return this.catsService.create29(query.Manufacturer, query.Product_Category, query.Series, query.Product,
         query.Core, query.RF_Frequency, query.Brand, query.Data_Bus_Width, query.Interface_Type, query.Operating_Supply_Voltage, query.Unit_Weight);
    }
    @UseGuards(JwtAuthGuard3)
    @Get('showProduct') 
    async  show029() {
      return this.catsService.findAll29();
    }
    @UseGuards(JwtAuthGuard3)
    @Get('deleteProduct') 
    async  delete029(@Body() query: { Product_id: number}) {
      return this.catsService.delete29(query.Product_id);
    }
    @UseGuards(JwtAuthGuard3)
    @Post('createRecord') 
    async  getHello030(@Body() query: {Temperature: string, Humidity: string, Clock_Cycle: string, CPU_Utilization: string, Date: string, 
      Time: string, Brand: string, Product_id: number,
      Unit_Weight: string}) {
      return this.catsService.create30(query.Temperature, query.Humidity, query.Clock_Cycle, query.CPU_Utilization,
        query.Date, query.Time, query.Product_id);
    }
    @UseGuards(JwtAuthGuard3)
    @Get('showRecord') 
    async  show030() {
      return this.catsService.findAll30();
    }
    @UseGuards(JwtAuthGuard3)
    @Get('deleteRecord') 
    async  delete030(@Body() query: { Record_id: number}) {
      return this.catsService.delete30(query.Record_id);
    }

    @Post('createRecord11') 
    async  create031(@Body() query: {nodeid: number, cpu_usage: number, temp: number, date: string, time: string}) {
      return this.catsService.create31(query.nodeid, query.cpu_usage, query.temp, query.date, query.time);
    }

    @Post('NewCreateRecord11') 
    async  create0031(@Body() query: {data2: string}) {
      return this.catsService.create031(query.data2);
    }

    @Post('createRecord11Excel') 
    async  create00031(@Body() query: {nodeid: number, cpu_usage: number, temp: number, humi: string, rssi: string, date: string, time: string}) {
      return this.catsService.create0031(query.nodeid, query.cpu_usage, query.temp, query.humi, query.rssi, query.date, query.time);
    }

    @Get('showRecord11') 
    async  show031() {
      return this.catsService.findAll31();
    }

    @Get('deleteRecord11') 
    async  delete031(@Body() query: { id: number}) {
      return this.catsService.delete31(query.id);
    }
    @Get('findLatestTime') 
    async  findLatestTime() {
      return this.catsService.findLatestTime();
    }
    @Get('findLatestDate') 
    async  findLatestDate() {
      return this.catsService.findLatestDate();
    }
    @Get('arrayTime') 
    async  arrayTime() {
      return this.catsService.arrayTime();
    }
    @Post('findOneTime') 
    async  findOneTime(@Body() query: { Product_id: number}) {
      return this.catsService.findOneTime(query.Product_id);
    }
    @Post('findOneTime2') 
    async  findOneTime2(@Body() query: { Product_id: number, Time: string}) {
      return this.catsService.findOneTime2(query.Product_id, query.Time);
    }
    @Get('findOneTimeNode1') 
    async  findOneTimeNode1() {
      return this.catsService.findOneTimeNode1();
    }
    @Get('findOneTimeNode2') 
    async  findOneTimeNode2() {
      return this.catsService.findOneTimeNode2();
    }
    @Get('findOneTimeNode3') 
    async  findOneTimeNode3() {
      return this.catsService.findOneTimeNode3();
    }
    @Post('validateUser2') 
    async  validateUser2(@Body() query: { phone_number: string, pass: string}) {
      return this.catsService.validateUser2(query.phone_number, query.pass);
    }
    @Post('validateUser3') 
    async  validateUser3(@Body() query: { user_name: string, pass: string}) {
      return this.catsService.validateUser3(query.user_name, query.pass);
    }
    @Post('upload2')
    @UseInterceptors(
      AnyFilesInterceptor({
        limits: {
          fileSize: 1024 * 1024 * 20, // 20MB limit (adjust as needed)
        },
      }),
    )
    async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
      // Check if any files were uploaded
      if (files && files.length > 0) {
        const baseDirectory = process.cwd();
        
        files.forEach(async (file) => {
          const filePath = `${baseDirectory}/video/${file.originalname}`;
          
          // Save each file to the specified directory
          fs.writeFileSync(filePath, file.buffer);
          
          console.log(`File saved to: ${filePath}`);
          try {
            const apiUrl = 'https://bc9e-42-116-6-42.ngrok-free.app/api/runFile';
            const formData = new FormData();
            formData.append('file', fs.createReadStream(filePath));
  
            await axios.post(apiUrl, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                ...formData.getHeaders(),
                'ngrok-skip-browser-warning': 0,
              },
            });
  
            console.log('File sent to external API successfully.');
          } catch (error) {
            console.error('Error sending file to external API:', error.message);
          }
  
        });
      } else {
        console.log('No files were uploaded.');
      }
    }
    @Get('listFileBase')
    async listVideos() {
      const baseDirectory = process.cwd();
      const directoryPath = path.join(baseDirectory, 'video');
      try {
        const files = await fs.promises.readdir(directoryPath);
        return { files };
      } catch (error) {
        throw error;
      }
    }

    @Get('readFile')
    async readFileContent(@Param('filename') filename: string) {
      try {
        const filePath = `path/to/your/files/${filename}`;
        const fileContent = await this.catsService.readFile(filePath);
        return fileContent;
      } catch (error) {
        // Handle errors, e.g., file not found
        throw new Error(`Error reading file: ${error.message}`);
      }
    }

    @Get('downloadImage')
    async downloadImage(@Res() res: Response): Promise<void> {
      try {
        const imageUrl = 'https://images.thdstatic.com/productImages/f79b2cdf-f78a-406a-96c9-021d2589a7df/svn/firm-grip-work-gloves-5137-06-64_1000.jpg';
  
        // Download the image using axios
        const response = await axios.get(imageUrl, { responseType: 'stream' });
   
        // Set the appropriate headers for the response
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', 'attachment; filename=image.jpg');
  
        // Pipe the image stream to the response
        response.data.pipe(res);
  
        // Save the image to the specified location
        const filePath = 'F:/course/course/Luan Van 2/AI Code/test0/x64/Release/downloaded-image.jpg';
        const fileStream = fs.createWriteStream(filePath);
        response.data.pipe(fileStream);
  
        // You can perform additional logic here, if needed
  
      } catch (error) {
        // Handle errors, e.g., log the error or send an appropriate response
        console.error('Error downloading image:', error);
        res.status(500).send('Internal Server Error');
      }
    }

    @Post('runFile')
    @UseInterceptors(
      AnyFilesInterceptor({
        limits: {
          fileSize: 1024 * 1024 * 20, // 20MB limit (adjust as needed)
        },
      }),
    )
    async runExecutable(@Res() res: Response, @Body() query: { id: string}, @UploadedFiles() files: Express.Multer.File[]) {
    // async  validateUser33(@Body() query: { id: string}) {
      // Check if any files were uploaded
      var fileName: string
      if (files && files.length > 0) {
        const baseDirectory = process.cwd();
        
        files.forEach((file) => {
          const filePath = `${baseDirectory}/video/${file.originalname}`;
          
          // Save each file to the specified directory
          fs.writeFileSync(filePath, file.buffer);
          
          console.log(`File saved to: ${filePath}`);

          fileName = file.originalname
        });
      } else {
        console.log('No files were uploaded.');
      }

      
      const filePath = "F:/course/course/Luan Van 2/AI Code/test0/x64/Release/image_directory.txt"
      const imageFolder = "C:/Users/ASUS/Desktop/backend/backend_365truck/video"
      // const imageFinalDirectory = path.join(imageFolder, query.id);
      const imageFinalDirectory = path.join(imageFolder, fileName);
      
      fs.writeFileSync(filePath, imageFinalDirectory);
      // try {
      //   const imageUrl = 'http://119.17.253.45/zm/ESP32/gloveTestTrue.jpg';

      //   // Download the image using axios
      //   const response = await axios.get(imageUrl, { responseType: 'stream' });

      //   // Save the image to the specified location
      //   const filePath = 'F:/course/course/Luan Van 2/AI Code/test0/x64/Release/downloaded-image.jpg';
      //   const fileStream = fs.createWriteStream(filePath);
      //   response.data.pipe(fileStream);
  
      //   // You can perform additional logic here, if needed
  
      // } catch (error) {
      //   // Handle errors, e.g., log the error or send an appropriate response
      //   console.error('Error downloading image:', error);
      //   res.status(500).send('Internal Server Error');
      // }

      const match = fileName.match(/(\d+)(?=\.[^.]*$)/);

      // Check if a match is found
      var lastNumber;
      console.log('file name is:', fileName)

      if (match) {
        lastNumber = match[1];
        console.log(`The last number is: ${lastNumber}`) ;
      } else {
        console.log(`"No number found in the given text"`) ;

      }
      

      try {
        const executablePath = '"F:/course/course/Luan Van 2/AI Code/test0/x64/Release/test0.exe"';

        // Run the executable file
        const childProcess = exec(executablePath, async (error, stdout, stderr) => {
          if (stdout.includes('Exiting due to timeout.')) {
            // res.status(200).send('Executable executed successfully');
            //console.log('Done');
            const filePath = 'F:/course/course/Luan Van 2/AI Code/test0/x64/Release/detection_results.txt';
            
            const result = await this.catsService.readFile(filePath);
            await fs2.writeFile(filePath, '')
            
            console.log('Result is: ', result);
            var inputDat2
            if(result != 'Glove Detected'){
              inputDat2 = {isMoving: false, driver_id: lastNumber,latitude: 4,longitude: 4} 
            }
            else{
              inputDat2 = {isMoving: true, driver_id: lastNumber,latitude: 4,longitude: 4} 
            }
            console.log('inputDat2: ', inputDat2);
            try {
              const response = await axios.post('https://365truck.fdssoft.com/api/emitMovingEvent', inputDat2, {
                headers: {
                  'Content-Type': 'application/json', // Adjust content type if needed
                },})
              ;
              // Process the response.data here
              console.log("emitMovingEvent response is:",response.data);
            } catch (error) {
              console.error('Axios error:', error.message);
              throw new HttpException('Unable to fetch data', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return res.status(200).send(result);

          } else {
            res.status(500).send('Internal Server Error');
            console.error('Unexpected output:', stdout);
          }
        });

        // You can perform additional logic here, if needed

      } catch (error) {
        // Handle errors, e.g., log the error or send an appropriate response
        console.error('Error running executable:', error);
        res.status(500).send('Internal Server Error');
      }
    }
    
    /// we don't use the below
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('video'))
    // async uploadVideo(
    //   @UploadedFile() file: Multer.File,
    //   @Body('title') title: string,
    //   @Body('description') description: string,
    // ): Promise<any> {
    //   if (!file || !title || !description) {
    //     throw new BadRequestException('Title, description, and video are required');
    //   }
  
    //   return this.catsService.uploadVideo(file, title, description);
    // }
    /////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////
    // @Post('upload2')
    // @UseInterceptors(
    //   FileInterceptor('file', {
    //     limits: {
    //       fileSize: 1024 * 1024 * 20, // 50MB limit (adjust as needed)
    //     },
    //   }),
    // )
    // async uploadFile(@UploadedFile() file: Express.Multer.File) {
    //   // Check if a file was uploaded
    //   if (file) {
    //     const baseDirectory = process.cwd();
    //     const filePath = `${baseDirectory}/video/${file.originalname}`;
  
    //     // Save the file to the specified directory
    //     fs.writeFileSync(filePath, file.buffer);
  
    //     console.log(`File saved to: ${filePath}`);
    //   } else {
    //     console.log('No file was uploaded.');
    //   }
    // }



    
}
//////////////////////////////////////////////////////////////////////////
  //   async function nice() {
  //     // const userExists = await Cat.exists({ _id: query.user_name });
  //     // if (userExists) console.log("User exists");
  //     //var App : Appreal = new App();
  //     const user = await this.catsService.findOne({ _id: query.user_name });
  //     if (user) console.log("User exists");
  //     else console.log("Error");
  
      
  // }
  ////////////////////////////////////////////////////////////////////////////
//   async findOne(@Param('id') id: string): Promise<Cat> () {
//     // const userExists = await Cat.exists({ _id: query.user_name });
//     // if (userExists) console.log("User exists");
//     //var App : Appreal = new App();
//     const user = await this.catsService.findOne({ _id: query.user_name });
//     if (user) console.log("User exists");
//     else console.log("Error");   
// }
///////////////////////////////////////////////////////////////////////////////

//   constructor(private readonly catsService: CatsService) {}
//   @Get(':password')

//   // async findOne(@Param('password') password: string): Promise<Cat> {
//   //   console.log(this.catsService.findOne(password));
//   //   return this.catsService.findOne(password);
//   // }
  
//   getHello(@Query() query: { user_name: string, password: string }): void {
//     console.log( `User_name: ${query.user_name}`);
//     console.log(`Password: ${query.password}`); 
    
// }


  
