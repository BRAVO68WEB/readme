import sanitize from "sanitize-filename";
import shell from "shelljs";

export const fetchForActor = (actorName: string) => {
	actorName = sanitize(actorName);
	const isPrefent = shell.find(`keys/${actorName}.key`);

	if (isPrefent.code === 1) {
		console.log(`⚠️ ${actorName}'s Key is not present!`);
		return {};
	} else {
		return {
			actorName,
			privateKey: shell.cat(`keys/${actorName}.key`).stdout,
			publicKey: shell.cat(`keys/${actorName}.key.pub`).stdout,
		};
	}
};
