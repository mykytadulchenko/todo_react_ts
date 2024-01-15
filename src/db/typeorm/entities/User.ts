import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item.js";
import Jwt from "./Jwt.js";

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

    @OneToOne(() => Jwt, (jwt) => jwt.user)
    jwt: Jwt
}

export default User