import { Collection, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_preferences')
export class UserPreferencesEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => UserEntity, (user) => user.preferences, { onDelete:'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
    
    @Column({ default: false })
    prefers_voice: boolean;

    @Column({ nullable: true})
    preferred_name: string;

    @Column({ nullable: true })
    pronouns: string;

    @Column({ default: 'pt-BR'})
    speech_language:"pt-BR";

    @Column({ type: 'float', default: 1.0})
    speech_rate:1.0;

    @Column({ default: 'didático' })
    assistant_persona: string;

    @Column({ default: false})
    consent_recorded: boolean;

    @UpdateDateColumn()
    updated_at: Date;
};