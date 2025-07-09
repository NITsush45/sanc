import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
  };
}

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private ns: NotificationsService) {}

  @Get()
  list(@Request() req: AuthenticatedRequest) {
    return this.ns.list(req.user.userId);
  }

  @Patch()
  toggle(
    @Request() req: AuthenticatedRequest,
    @Body() body: { id: number; isRead: boolean }
  ) {
    return this.ns.toggleRec(body.id, req.user.userId, body.isRead);
  }
}
