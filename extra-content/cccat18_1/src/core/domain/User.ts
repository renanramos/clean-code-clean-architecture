import ValidationError from "./ValidationError";
import { validateCpf } from "./../../validateCpf";

export default class User {
    
    id: string;
    name: string;
    email: string;
    cpf: string;
    carPlate: string;
    password: string;
    isPassenger: boolean;
    isDriver: boolean

    constructor(readonly req: any
    ) {
        const input = req.body;
        
        this.id = crypto.randomUUID();
        
        this.name = input['name']; 
        this.email = input['email']; 
        this.cpf = input['cpf'];
        this.carPlate = input['carPlate']; 
		this.password = input['password'];
        this.isPassenger = input['isPassenger'];
        this.isDriver = input['isDriver'];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getCpf() {
        return this.cpf;
    }

    getCarPlate() {
        return this.carPlate;
    }

    getIsPassenger() {
        return this.isPassenger;
    }

    getIsDriver() {
        return this.isDriver;
    }

    getPassword() {
        return this.password;
    }

    validate() {
        if (!this.name.match(/[a-zA-Z] [a-zA-Z]+/)) {
            return new ValidationError("Invalid user name", -3);
        }

        if (!this.email.match(/^(.+)@(.+)$/)) {
            return new ValidationError("Invalid user email", -2);
        } 

        if(!validateCpf(this.cpf)) {
            return new ValidationError("Invalid user CPF", -1);
        }

        if(this.isDriver && !this.carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
            return new ValidationError("Invalid driver carPlate", -5);
        }
        
        return null;
    }
}