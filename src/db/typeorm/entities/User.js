import { EntitySchema } from "typeorm";

const User = new EntitySchema({
    name: 'users',
    columns: {
        id: {
            type: "uuid",
            generated: true,
            primary: true,
            default: "uuid_generate_v4()"
        },
        login: {
            type: "varchar",
            length: 16
        },
        email: {
            type: "varchar",
            length: 255
        },
        password: {
            type: "varchar",
            length: 255
        }
    }
})

export default User