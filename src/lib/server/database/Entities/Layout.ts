import {Entity, Column, BaseEntity, PrimaryColumn} from "typeorm"

@Entity()
export default class Layout extends BaseEntity {
    @PrimaryColumn("varchar")
    name!: string

    @Column("text")
    value!: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated!: Date

}