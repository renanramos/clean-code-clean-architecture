import pgp from "pg-promise";
import User from "../core/domain/User";
import IRepository from "./IRepository";
import UserResponse from "./response/UserResponse";

export default class UserRepository implements IRepository {
       
    connection: any;
    
    async getUserByEmail(email: string): Promise<UserResponse> {
        this.connection = await pgp()("postgres://postgres:123456@localhost:5432/app")
        const [acc] = await this.connection.query("select * from ccca.account where email = $1", [email]);
        await this.connection.$pool.end();

        return acc;
    }
    
    async save(user: User): Promise<UserResponse> {
        this.connection = await pgp()("postgres://postgres:123456@localhost:5432/app");
        await this.connection.query("insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)", 
            [user.getId(), user.getName(), user.getEmail(), 
                user.getCpf(), user.getCarPlate(), !!user.getIsPassenger(), !!user.getIsDriver(), user.getPassword()]);
        await this.connection.$pool.end();
        
        return new UserResponse(user.getId());
    }   
}