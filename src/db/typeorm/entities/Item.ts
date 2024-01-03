import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User.js";

@Entity("todos")
class Item {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 255})
    value: string

    @Column()
    completed: boolean

    @CreateDateColumn({type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User
}

export default Item