import { Entity, ObjectIdColumn, Column, Index, ObjectId } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity('users')
export class User {
  @ObjectIdColumn()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  @Transform(({ value }) => value?.toString())
  id: ObjectId;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  email_verified_at: Date;

  @Column({ nullable: true })
  delete_at: Date;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
