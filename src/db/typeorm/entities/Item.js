import { EntitySchema } from "typeorm";

const Item = new EntitySchema({
    name: "todos",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: true,
            default: "uuid_generate_v4()"
        },
        value: {
            type: "varchar",
            length: 255
        },
        "isFinished": {
            type: "boolean"
        },
        created: {
            type: "timestamp",
            default: "current_timestamp"
        },
        modified: {
            type: "timestamp",
            default: "current_timestamp"
        },
        user_id: {
            type: "uuid"
        }
    },
    relations: {
        users: {
            target: "users",
            type: "many-to-one",
            joinColumn: {
                name: "user_id", referencedColumnName: "id"
            }
        }
    }
})

export default Item