import express from "express";
import UserDelegate from "../delegate/UserDelegate";
import UserUseCase from "../../core/usecase/UserUseCase";
import UserRepository from "../../interfaceadapter/UserRepository";
import ValidationError from "../../core/domain/ValidationError";

const routes = express();

routes.post("/signup", async function (req, res) {
	const userDelegate = new UserDelegate(new UserUseCase(new UserRepository()));
	const response = await userDelegate.signUp(req);

	if (response instanceof ValidationError) {
		res.status(422).json(response);
	} else {
		res.json(response);
	}

});

export default routes;