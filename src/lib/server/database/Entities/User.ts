import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, Unique} from "typeorm"
import type {UserData} from "$lib/shared/User/UserData";
import type {RaceEnum} from "$lib/shared/races/RaceEnum";

@Entity()
@Unique('user_email', ["email"])
@Unique('user_charname', ["charname"])
export default class User extends BaseEntity implements UserData {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar")
    email!: string

    @Column("varchar")
    charname!: string

    @Column("varchar")
    password!: string;

    @Column("varchar")
    race!: RaceEnum

    @Column("int")
    xp!: number;




}