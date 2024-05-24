import {BaseEntity, Column, Entity, Int32, PrimaryGeneratedColumn, Unique} from "typeorm"
import type {UserData} from "$lib/shared/User/UserData";
import {RaceEnum} from "$lib/shared/races/RaceEnum";
import type {MultiPolygon} from "polygon-clipping";

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

    @Column({
        type: "enum",
        enum: RaceEnum,
        default: RaceEnum.HUMAN
    })
    race!: keyof typeof RaceEnum

    @Column("int", {default: 0})
    xp!: number;

    @Column("int", {default: 100})
    posx!: number;

    @Column("int", {default: 100})
    posy!: number;

    @Column("int", {default: 2**30})
    life!: number;

    @Column("json", {default: []})
    mapView!: MultiPolygon




}