import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { AbstractEntity } from "./AbstractEntity";

export const VIDEO_ENTITY = `video`;
@Entity(VIDEO_ENTITY)
export class Video extends AbstractEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 255 })
    url: string;

    @Column({ type: "int", name: "user_id" })
    userId: string;

    // RELATIONSHIP
    @ManyToOne(() => User, (user) => user.videos)
    @JoinColumn({ name: "user_id" })
    owner?: User;
}
