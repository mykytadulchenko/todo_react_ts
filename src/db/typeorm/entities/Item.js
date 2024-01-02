import { EntitySchema } from "typeorm";

const Item = new EntitySchema({
    name: "todos",
    columns: {
        id: {
            type: "uuid",
            generated: true,
            default: () => "uuid_generate_v4()",
            primary: true,
        },
        value: {
            type: "varchar",
            length: 255
        },
        completed: {
            type: "boolean"
        },
        created_at: {
            type: "timestamp",
            default: () => "current_timestamp"
        },
        updated_at: {
            type: "timestamp",
            default: () => "current_timestamp"
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