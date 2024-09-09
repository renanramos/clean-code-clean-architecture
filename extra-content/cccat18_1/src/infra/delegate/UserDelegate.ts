import User from "../../core/domain/User";
import ValidationError from "../../core/domain/ValidationError";
import IUserUseCase from "../../core/usecase/IUserUseCase";
import UserUseCase from "../../core/usecase/UserUseCase";
import UserRepository from "../../interfaceadapter/UserRepository";

export default class UserDelegate {

    userUseCase: IUserUseCase;

    constructor(userUseCase: UserUseCase){
        this.userUseCase = userUseCase;
    }


    async signUp(req: any) {
        const user = new User(req);
        const usecase = new UserUseCase(new UserRepository());

        const validationError = user.validate();
        
        if (validationError) {
            return validationError;
        }

        const acc = await usecase.getUserByEmail(user.getEmail());
        
        if (acc) {
            return new ValidationError("User already exists", -4);
        }
        
        return await usecase.signup(user);
    }


}