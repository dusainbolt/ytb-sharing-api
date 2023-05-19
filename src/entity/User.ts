import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Video } from "./Video";

export const USER_ENTITY = `user`;
@Entity(USER_ENTITY)
export class User extends AbstractEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 21, unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Video, (video) => video.owner)
    videos?: Video[];
}
