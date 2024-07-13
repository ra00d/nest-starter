import { User } from '../../auth/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email({ firstName: user.name });
  user.role = 'USER';
  user.lastLogin = new Date();
  user.password = 'password';
  user.active = true;
  return user;
});
