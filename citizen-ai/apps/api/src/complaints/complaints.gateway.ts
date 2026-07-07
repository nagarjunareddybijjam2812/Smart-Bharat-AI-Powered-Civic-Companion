import {
  WebSocketGateway, SubscribeMessage, MessageBody,
  ConnectedSocket, WebSocketServer, WsException,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { UseGuards } from '@nestjs/common'

@WebSocketGateway({ namespace: '/complaints', cors: { origin: '*' } })
export class ComplaintsGateway {
  @WebSocketServer() server!: Server

  handleConnection(client: Socket) {
    const complaintId = client.handshake.query.complaintId as string
    if (complaintId) client.join(`complaint:${complaintId}`)
  }

  emitComplaintUpdate(complaintId: string, update: unknown) {
    this.server.to(`complaint:${complaintId}`).emit('complaint:updated', update)
  }
}
