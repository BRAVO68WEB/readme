import enquirer from 'enquirer';
import shell from 'shelljs';

import DBClient from '../providers/database-client';
import UserService from '../services/users.service';

const isPrefent = shell.find('keys/server.key');

if(isPrefent.code === 0){
    console.log('✅ Server Key is present!');
}
else{
    console.log('❌ Server Key is not present!');
    // Generate the a private and public key pair using RSA
    shell.exec('ssh-keygen -t rsa -P "" -b 4096 -m PEM -f keys/server.key');
    shell.exec('ssh-keygen -e -m PEM -f keys/server.key > keys/server.key.pub');

    console.log('✅ Server Key is now present!');
}

if(DBClient.getUsers().length === 0){
    console.log('❌ No users are present!');
    console.log('✅ Creating a new user...');

    const questions = await enquirer.prompt([{
        type: 'input',
        name: 'username',
        message: 'Username: ' 
    },{
        type: 'password',
        name: 'password',
        message: 'Password: '
    }, {
        type: 'input',
        name: 'email',
        message: 'Email: '
    }]);

    const { username, password, email } = questions as { username: string, password: string, email: string };
    const result = await new UserService().createUserS(
        username,
        password,
        email
    );

    if(result){
        console.log('✅ User created successfully!');
    }
    else{
        console.log('❌ User creation failed!');
    }

    console.log('✅ User creation complete!');
}
else {
    console.log('✅ Users are present!');
}