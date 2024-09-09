export default class ValidationError {


    readonly message: string;
    readonly result: number;

    constructor(message: string,  result: number) {
        this.result = result;
        this.message = message;
    }

}