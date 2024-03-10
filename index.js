'use strict';

const Hapi = require('@hapi/hapi');
const { Sequelize, DataTypes } = require('sequelize');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // PostgreSQL connection configuration
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres',
    });

    // Define a model for the "users" table
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });

    // Create the "users" table
    await sequelize.sync();

    // Route to list all users
    server.route({
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {
            try {
                // Fetch all users
                const users = await User.findAll();
                console.log('Fetched users:', users); // Add this line for debugging
                console.log("Hello");
                h.response("Hello Hello hello")
                return { users };
            } catch (error) {
                console.error('Error fetching users:', error);
                return h.response('Internal Server Error').code(500);
            }
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();


// 'use strict';

// const Hapi = require('@hapi/hapi');
// const { Sequelize, DataTypes } = require('sequelize');

// const init = async () => {
//     const server = Hapi.server({
//         port: 3000,
//         host: 'localhost',
//     });

//     // PostgreSQL connection configuration
//     const sequelize = new Sequelize({
//         dialect: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres',
//         password: 'mysecretpassword',
//         database: 'postgres',
//     });

//     // Define a model for the "messages" table
//     const Message = sequelize.define('Message', {
//         message: {
//             type: DataTypes.STRING,
//         },
//     });

//     // Sync the model with the database
//     await sequelize.sync();

//     server.route({
//         method: 'GET',
//         path: '/',
//         handler: async (request, h) => {
//             try {
//                 // Create a new message
//                 const message = await Message.create({
//                     message: 'Hello, Sequelize!',
//                 });

//                 // Retrieve the message from the database
//                 const retrievedMessage = await Message.findOne({
//                     where: { id: message.id },
//                 });

//                 return retrievedMessage.message;
//             } catch (error) {
//                 console.error(error);
//                 return 'Error occurred';
//             }
//         },
//     });

//     await server.start();
//     console.log('Server running on %s', server.info.uri);
// };

// process.on('unhandledRejection', (err) => {
//     console.error(err);
//     process.exit(1);
// });

// init();


// 'use strict';

// const Hapi = require('@hapi/hapi');
// const { Pool } = require('pg');

// const init = async () => {
//     const server = Hapi.server({
//         port: 3000,
//         host: 'localhost',
//     });

//     // PostgreSQL connection pool configuration
//     const pool = new Pool({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'postgres',
//         password: 'mysecretpassword', // Update with your PostgreSQL password
//         port: 5432,
//     });

//     server.route({
//         method: 'GET',
//         path: '/',
//         handler: async (request, h) => {
//             const client = await pool.connect();
//             try {
//                 const result = await client.query('SELECT $1::text as message', ['Hello, PostgreSQL!']);
//                 return result.rows[0].message;
//             } finally {
//                 client.release();
//             }
//         },
//     });

//     await server.start();
//     console.log('Server running on %s', server.info.uri);
// };

// process.on('unhandledRejection', (err) => {
//     console.error(err);
//     process.exit(1);
// });

// init();
