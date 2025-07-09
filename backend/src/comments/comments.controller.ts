import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Patch,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

interface AuthRequest extends ExpressRequest {
  user: { userId: number };
}

@Controller('comments')
export class CommentsController {
  constructor(private cs: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: AuthRequest, @Body() body: { content: string; parentId?: number }) {
    return this.cs.create(req.user.userId, body.content, body.parentId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  edit(@Request() req: AuthRequest, @Body() body: { id: number; content: string }) {
    return this.cs.edit(body.id, req.user.userId, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('delete/:id')
  delete(@Request() req: AuthRequest, @Body() body: { id: number }) {
    return this.cs.delete(body.id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('restore/:id')
  restore(@Request() req: AuthRequest, @Body() body: { id: number }) {
    return this.cs.restore(body.id, req.user.userId);
  }

  @Get()
  list() {
    return this.cs.findAll();
  }
}
