import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}

export default User