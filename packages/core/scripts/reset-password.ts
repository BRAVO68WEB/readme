import enquirer from "enquirer";

import DBClient from "../providers/database-client";
import UserService from "../services/users.service";

DBClient.init();

if (DBClient.getUsers().length === 0) {
	console.log("❌ No users are present!");
}

const questions = await enquirer.prompt([
	{
		type: "input",
		name: "username",
		message: "Username: ",
	},
	{
		type: "password",
		name: "password",
		message: "New Password: ",
	}
]);

const { username, password } = questions as {
	username: string;
	password: string;
};
const result = await new UserService().changePasswordS(
	username,
	password,
);

if (result) {
	console.log("✅ Password changed!");
} else {
	console.log("❌ Password change failed!");
}
