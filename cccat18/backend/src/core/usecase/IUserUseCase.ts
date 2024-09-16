import UserResponse from "../../interfaceadapter/response/UserResponse";
import User from "../domain/User";

export default interface IUserUseCase {
    
    signup(user: User): Promise<UserResponse>;
    getUserByEmail(email: string): Promise<UserResponse>;
}