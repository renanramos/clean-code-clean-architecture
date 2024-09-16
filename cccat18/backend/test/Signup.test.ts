import request from "supertest";
import app from "../src/signup";

test("Deve validar quando um novo motorista é incluído", async function () {

    // Given
    const driver = {
        name: "Novo Motorista",
        email: "motorista01@mail.com",
        cpf: "22353821693",
        carPlate: "ABC0123",
        isPassenger: false,
        isDriver: true,
        password: "1234"
    };

    // When
    const response = await request(app)
        .post('/signup')
        .send(driver);
    
    // Then
    expect(response.body['accountId']).not.toEqual(null);
    expect(response.status).toBe(200);
});

test("Não deve validar quando um novo motorista já existe", async function () {

    // Given
    const driver = {
        name: "Novo Motorista",
        email: "motorista01@mail.com",
        cpf: "22353821693",
        carPlate: "ABC0123",
        isPassenger: false,
        isDriver: true,
        password: "1234"
    };

    // When
    const response = await request(app)
        .post('/signup')
        .send(driver);
    
    // Then
    expect(response.body['accountId']).not.toEqual(null);
    expect(response.status).toBe(422);
    expect(response.body['message']).toBe("User already exists");
    expect(response.body['result']).toBe(-4);
});

test("Deve validar quando um novo passageiro é incluído", async function () {

    // Given
    const passenger = {
        name: "Novo Passageiro",
        email: "passageiro01@mail.com",
        cpf: "22353821693",
        carPlate: "ABC0123",
        isPassenger: true,
        isDriver: false,
        password: "123456"
    };

    // When
    const response = await request(app)
        .post('/signup')
        .send(passenger);
    
    // Then
    expect(response.status).toBe(200);
    expect(response.body['accountId']).not.toEqual(null);
});

test("Não deve validar quando um novo passageiro com nome inválido", async function () {

    // Given
    const passenger = {
        name: "1 Passageiro 1",
        email: "passageiro_invalid_name@mail.com",
        cpf: "22353821693",
        carPlate: "ABC0123",
        isPassenger: true,
        isDriver: false,
        password: "123456"
    };

    // When
    const response = await request(app)
        .post('/signup')
        .send(passenger);

    // Then
    expect(response.body['message']).not.toEqual(null);
    expect(response.status).toBe(422);
    expect(response.body['message']).toBe("Invalid user name");
    expect(response.body['result']).toBe(-3);
});

test("Não deve validar quando um novo passageiro com email inválido", async function () {

    // Given
    const passenger = {
        name: "Novo Passageiro",
        email: "passageiro_invalid_email",
        cpf: "22353821693",
        carPlate: "ABC0123",
        isPassenger: true,
        isDriver: false,
        password: "123456"
    };

    // When
    const response = await request(app)
        .post('/signup')
        .send(passenger);
    
    // Then
    expect(response.body['message']).not.toEqual(null);
    expect(response.status).toBe(422);
    expect(response.body['message']).toBe("Invalid user email");
    expect(response.body['result']).toBe(-2);
});

test("Não deve validar quando um novo passageiro com cpf inválido", async function () {

    // Given
    const passenger = {
        name: "Novo Passageiro",
        email: "passageiro_invalid_cpf@mail.com",
        cpf: "22A53821693",
        carPlate: "ABC0123",
        isPassenger: true,
        isDriver: false,
        password: "123456"
    };

    // When
    const response = await request(app)
        .post('/signup')
        .send(passenger);
    
    // Then
    expect(response.body['message']).not.toEqual(null);
    expect(response.status).toBe(422);
    expect(response.body['message']).toBe("Invalid user CPF");
    expect(response.body['result']).toBe(-1);
});

test("Não deve validar quando um novo motorista com placa do veículo inválido", async function () {

    // Given
    const passenger = {
        name: "Novo Motorista",
        email: "motorista_invalid_car_plate@mail.com",
        cpf: "22353821693",
        carPlate: "1ABC",
        isPassenger: false,
        isDriver: true,
        password: "123456"
    };

    // When
    const response = await request(app)
        .post('/signup')
        .send(passenger);
    
    // Then
    expect(response.body['message']).not.toEqual(null);
    expect(response.status).toBe(422);
    expect(response.body['message']).toBe("Invalid driver carPlate");
    expect(response.body['result']).toBe(-5);
});