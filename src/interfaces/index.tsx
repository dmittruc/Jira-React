type TUserRole = 'ADMIN' | 'USER';

interface IProject {
  id: string;
  title: string;
  taskCount: number;
  users: IUser[];
}

interface IUser {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
}
