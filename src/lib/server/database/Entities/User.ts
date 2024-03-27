import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm"
import type {UserData} from "$lib/shared/User/UserData";
import type {RaceEnum} from "$lib/shared/races/RaceEnum";

@Entity()
export default class User extends BaseEntity implements UserData {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar")
    username!: string

    @Column("varchar")
    password!: string;

    @Column("varchar")
    race!: RaceEnum

    @Column("int")
    xp!: number;

}