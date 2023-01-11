import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('user_profile')
export class UsersProfile {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 13 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ name: 'user_type_code', type: 'varchar', length: 2 })
  userTypeCode: string;

  @OneToOne(() => User, user => user.usersProfile, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'login_id' })
  user: User;

  static createInstance({ phoneNumber, address, userTypeCode }) {
    const userProfile = new UsersProfile();
    userProfile.phoneNumber = phoneNumber;
    userProfile.address = address;
    userProfile.userTypeCode = userTypeCode;

    return userProfile;
  }
}
