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

  @Column({ name: 'user_type', type: 'varchar', length: 10 })
  userType: 'USER' | 'PARTNER' | 'ADMIN';

  @OneToOne(() => User, user => user.usersProfile, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'login_id' })
  user: User;

  static createInstance({ phoneNumber, address, userType }) {
    const userProfile = new UsersProfile();
    userProfile.phoneNumber = phoneNumber;
    userProfile.address = address;
    userProfile.userType = userType;

    return userProfile;
  }
}
