import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item.js";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 16})
    login: string

    @Column({length: 255})
    email: string

    @Column({length: 255})
    password: string

    @OneToMany(() => Item, (item) => item.user)
    item: Item[]
}

export default User