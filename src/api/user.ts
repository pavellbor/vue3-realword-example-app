import type { User } from "../types/user";
import { ApiClient } from "../libs/apiClient";

class UserApi extends ApiClient {
  async register(user: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    const { user: userData } = await this.post<{ user: User }>(`/users`, {
      user,
    });

    return userData;
  }

  async login(user: { email: string; password: string }): Promise<User> {
    const { user: userData } = await this.post<{ user: User }>(`/users/login`, {
      user,
    });

    return userData;
  }

  async getCurrentUser(): Promise<User> {
    const { user: userData } = await this.get<{ user: User }>(`/user`);
    return userData;
  }
}

export const userApi = new UserApi();
