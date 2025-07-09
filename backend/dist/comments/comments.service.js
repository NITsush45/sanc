"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("./comment.entity");
const typeorm_2 = require("typeorm");
const notifications_service_1 = require("../notifications/notifications.service");
let CommentsService = class CommentsService {
    constructor(comments, notifications) {
        this.comments = comments;
        this.notifications = notifications;
    }
    async create(authorId, content, parentId) {
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
        const map = new Map();
        all.forEach(c => map.set(c.id, []));
        all.forEach(c => {
            if (c.parentId != null)
                map.get(c.parentId).push(c);
        });
        return all.filter(c => !c.parentId).map(c => this.mapChildren(c, map));
    }
    mapChildren(comment, map) {
        comment.children = map.get(comment.id) || [];
        comment.children = comment.children.map(c => this.mapChildren(c, map));
        return comment;
    }
    async edit(id, authorId, content) {
        const c = await this.comments.findOne({ where: { id } });
        if (!c || c.authorId !== authorId)
            throw new common_1.ForbiddenException();
        if (Date.now() - c.createdAt.getTime() > 15 * 60 * 1000)
            throw new common_1.ForbiddenException();
        c.content = content;
        return this.comments.save(c);
    }
    async delete(id, authorId) {
        const c = await this.comments.findOne({ where: { id } });
        if (!c || c.authorId !== authorId)
            throw new common_1.ForbiddenException();
        c.isDeleted = true;
        c.deletedAt = new Date();
        return this.comments.save(c);
    }
    async restore(id, authorId) {
        const c = await this.comments.findOne({ where: { id } });
        if (!c ||
            c.authorId !== authorId ||
            !c.isDeleted ||
            Date.now() - c.deletedAt.getTime() > 15 * 60 * 1000)
            throw new common_1.ForbiddenException();
        c.isDeleted = false;
        c.deletedAt = null;
        return this.comments.save(c);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map