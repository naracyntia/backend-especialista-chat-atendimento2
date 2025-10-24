import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserPreferencesEntity } from "./user-preferences.entity";

@Entity({ name:'user'})
export class UserEntity {
    @OneToOne(()=> UserPreferencesEntity, pref => pref.user)
    preferences: UserPreferencesEntity;
    
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'surname', nullable: false })
    surname: string;

    @Column({ name: 'mail', nullable: false })
    mail: string;

    @Column({ name: 'phone', nullable: false })
    phone: string;

    @Column({ name: 'password', nullable: false, select: false })
    password: string;
}