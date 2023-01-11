import { Column, Entity, OneToOne } from 'typeorm';
import { UsersProfile } from './usersProfile.entity';

@Entity('user')
export class User {
  @Column({ primary: true, name: 'login_id', type: 'varchar', length: 36 })
  loginId: string;

  @Column({ type: 'varchar', length: 65 })
  password: string;

  @OneToOne(() => UsersProfile, usersProfile => usersProfile.user)
  usersProfile: UsersProfile;

  static createInstance({ loginId, password }) {
    const user = new User();
    user.loginId = loginId;
    user.password = password;
    return user;
  }
}
