import * as bycrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column('enum', {
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  })
  role: 'ADMIN' | 'USER';

  @Column()
  active: boolean;

  @Column()
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(this.password, salt);
    if (!(await bycrypt.compare(this.password, this.password)))
      this.password = hashedPassword;
  }
}
