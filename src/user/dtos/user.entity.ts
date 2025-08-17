import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true })
    mail: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    
}

export interface UserService {
}