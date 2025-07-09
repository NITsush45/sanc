import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private comments: Repository<Comment>,
    private notifications: NotificationsService,
  ) {}

  async create(authorId: number, content: string, parentId?: number) {
    const comment = this.comments.create({ authorId, content, parentId });
    const saved = await this.comments.save(comment);
    if (parentId) {
      const parent = await this.comments.findOne({ where: { id: parentId } });
      if (parent && parent.authorId !== authorId) {
        await this.notifications.notifyReply(parent.authorId, saved.id);
      }
    }
    return saved;
  }

  async findAll() {
    const all = await this.comments.find({ order: { createdAt: 'ASC' } });
    const map = new Map<number, Comment[]>();
    all.forEach(c => map.set(c.id, []));
    all.forEach(c => {
      if (c.parentId != null) map.get(c.parentId!)!.push(c);
    });
    return all.filter(c => !c.parentId).map(c => this.mapChildren(c, map));
  }

  private mapChildren(comment: Comment, map: Map<number, Comment[]>): Comment {
    comment.children = map.get(comment.id) || [];
    comment.children = comment.children.map(c => this.mapChildren(c, map));
    return comment;
  }

  async edit(id: number, authorId: number, content: string) {
    const c = await this.comments.findOne({ where: { id } });
    if (!c || c.authorId !== authorId) throw new ForbiddenException();
    if (Date.now() - c.createdAt.getTime() > 15 * 60 * 1000) throw new ForbiddenException();
    c.content = content;
    return this.comments.save(c);
  }

  async delete(id: number, authorId: number) {
    const c = await this.comments.findOne({ where: { id } });
    if (!c || c.authorId !== authorId) throw new ForbiddenException();
    c.isDeleted = true;
    c.deletedAt = new Date();
    return this.comments.save(c);
  }

  async restore(id: number, authorId: number) {
    const c = await this.comments.findOne({ where: { id } });
    if (
      !c ||
      c.authorId !== authorId ||
      !c.isDeleted ||
      Date.now() - c.deletedAt!.getTime() > 15 * 60 * 1000
    )
      throw new ForbiddenException();
    c.isDeleted = false;
    c.deletedAt = null;
    return this.comments.save(c);
  }
}
