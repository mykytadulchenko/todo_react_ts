import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import type { Relation } from "typeorm";
import User from "./User.js";

@Entity('tokens')
class Jwt {
    @PrimaryColumn("uuid")
    id: string
    
    @Column()
    access_token: string

    @Column()
    refresh_token: string

    @OneToOne(() => User, (user) => user.jwt)
    @JoinColumn({name: 'id'})
    user: Relation<User>
}

export default Jwt