import shell from 'shelljs';
import sanitize from 'sanitize-filename';

export const genForActor = async (actorName: string) => {
    actorName = sanitize(actorName);
    const isPrefent = shell.find(`keys/${actorName}.key`)

    if(isPrefent.code === 0){
        console.log(`⚠️ ${actorName}'s Key is already present!`);
    }
    else{
        // Generate the a private and public key pair using RSA
        shell.exec(`ssh-keygen -t rsa -P "" -b 4096 -m PEM -f keys/${actorName}.key`)
        shell.exec(`ssh-keygen -e -m PEM -f keys/${actorName}.key > keys/${actorName}.key.pub`)

        console.log(`✅ ${actorName}'s Key is now add!`);
    }

    return {
        actorName,
        privateKey: shell.cat(`keys/${actorName}.key`).stdout,
        publicKey: shell.cat(`keys/${actorName}.key.pub`).stdout
    }
}