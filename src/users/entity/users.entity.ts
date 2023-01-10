import { Column, Entity, OneToOne } from 'typeorm';
import { UsersProfile } from './usersProfile.entity';

@Entity('user')
export class User {
  @Column({ primary: true, name: 'login_id', type: 'varchar', length: 36 })
  loginId: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @OneToOne(() => UsersProfile, usersProfile => usersProfile.user)
  usersProfile: UsersProfile;
}
