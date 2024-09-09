import User from "../core/domain/User";
import UserResponse from "./response/UserResponse";

export default interface IRepository {

    getUserByEmail(email: string): Promise<UserResponse>;
    save(user: User): Promise<UserResponse>;
}

