import shell from 'shelljs';

export const serverPublicKey = () => {
    const isPrefent = shell.find('keys/server.key');

    if(isPrefent.code === 1){
        console.log('⚠️ Server\'s Key is not present!');
        return null;
    }
    else{
        // Generate the a private and public key pair using RSA
        return shell.cat('keys/server.key').stdout;
    }
};

export const serverPrivateKey = () => {
    const isPrefent = shell.find('keys/server.key.pub');

    if(isPrefent.code === 1){
        console.log('⚠️ Server\'s Key is not present!');
        return null;
    }
    else{
        // Generate the a private and private key pair using RSA
        return shell.cat('keys/server.key.pub').stdout;
    }
};