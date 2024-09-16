import IRepository from "../../interfaceadapter/IRepository";
import UserResponse from "../../interfaceadapter/response/UserResponse";
import UserRepository from "../../interfaceadapter/UserRepository";
import User from "../domain/User";

export default class UserUseCase {

    userRepository: IRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async signup(user: User): Promise<UserResponse> {
        return await this.userRepository.save(user);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.getUserByEmail(email);
    }

}