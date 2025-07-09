import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentId?: number;

  @ManyToOne(() => Comment, (c) => c.children, { onDelete: "CASCADE" })
  parent?: Comment;

  @OneToMany(() => Comment, (c) => c.parent, { cascade: true })
  children?: Comment[];

  @Column()
  authorId: number;

  @Column("text")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | null;
}
