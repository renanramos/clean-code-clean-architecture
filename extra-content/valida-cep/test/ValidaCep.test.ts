import { validarCEP } from "../src/ValidaCep";

test("Deve validar CEP igual 37540000", function () {
    const cep = "37540000";
    expect(validarCEP(cep)).toEqual('');
});

test("Deve validar CEP com formatação 37.540-000", function () {
    const cep = "37.540-000";
    expect(validarCEP(cep)).toEqual('');
});

test("Deve validar CEP vazio", function () {
    const cep = "";
    expect(validarCEP(cep)).toEqual('');
});

test("Não deve validar CEP com mais de 11 dígitos", function () {
    const cep = "375400001";
    expect(validarCEP(cep)).toEqual("Nº de dígitos do CEP menor que o normal ou em branco. Redigite-o!");
});

test("Não deve validar CEP com todos os dígitos iguais", function () {
    const cep = "33333333";
    expect(validarCEP(cep)).toEqual("CEP inválido!");
});

test("Não deve validar CEP com todos os dígitos iguais", function () {
    const cep = "11111111";
    expect(validarCEP(cep)).toEqual("CEP inválido!");
});

test("Não deve validar CEP com digito inválido", function () {
    const cep = "3754A000";
    expect(validarCEP(cep)).toEqual("O CEP informado contém dígitos inválidos. Corrija-o!");
});

test("Deve validar CEP com formatação inválida", function () {
    const cep = "37.540=000";
    expect(validarCEP(cep)).toEqual('O CEP informado contém dígitos inválidos. Corrija-o!');
});