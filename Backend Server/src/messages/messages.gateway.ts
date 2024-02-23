import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { HttpService } from '@nestjs/axios';




@WebSocketGateway({
  path: '/api/socket',cors: {
    origin: '*',
    
  }
})


export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  //this test if update coord worked
  @SubscribeMessage('updateCoor')
  async updateCoor(@MessageBody('driver_id') driver_id: number, @MessageBody('latitude') latitude: number,
                   @MessageBody('longtitude') longtitude: number, @ConnectedSocket() client: Socket,
                   @MessageBody('isMoving') isMoving: boolean) {
    const message = await this.messagesService.updateCoor(driver_id, latitude, longtitude)
    
    const name = await this.messagesService.getClientName(client.id);
    this.server.emit('message', message);
    //client.broadcast.emit('updateCoor', {name, isMoving});
    return message;
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket,) {
    const message = await this.messagesService.create(createMessageDto, client.id)
    
    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneCoor')
  async findOneCoor(@MessageBody('driver_id') driver_id: number, @ConnectedSocket() client: Socket,) {
    //return this.messagesService.findOne(driver_id);
    client.broadcast.emit('moving', {driver_id});
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ){
    return this.messagesService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ){
    const name = await this.messagesService.getClientName(client.id);

    client.broadcast.emit('typing', {name,
       isTyping});
    return this.messagesService.identify(name, client.id);
  }

  //this the real deal, use to track current coordinate
  @SubscribeMessage('moving')
  async moving(
    @MessageBody('isMoving') isMoving: boolean,
    @MessageBody('driver_id') driver_id: number,
    @MessageBody('latitude') latitude: string,
    @MessageBody('longtitude') longtitude: string,
    @ConnectedSocket() client: Socket,
  ){
    //const name = await this.messagesService.getClientName(client.id);

    client.broadcast.emit('moving', {isMoving, driver_id, latitude, longtitude});
    var abc = {};
    abc = {isMoving, driver_id, latitude, longtitude};
    return abc;
  }

  @SubscribeMessage('recShipment')
  async recShipment(
    @MessageBody('state') state: number,
    @MessageBody('driver_id') driver_id: number,
    @MessageBody('user_id') user_id: number,
    @MessageBody('shipment_id') shipment_id: number,
    @ConnectedSocket() client: Socket,
  ){
    //const name = await this.messagesService.getClientName(client.id);

    client.broadcast.emit('recShipment', {state, driver_id, user_id, shipment_id});
    var abc = {};
    console.log('socket okay 2')
    abc = {state, driver_id, user_id, shipment_id};
    return abc;
  }


}
