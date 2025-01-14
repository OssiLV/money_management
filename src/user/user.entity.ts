import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ name: 'email', type: 'varchar', nullable: false })
    email: string;

    @Column({ name: 'password', length: 35, nullable: false })
    password: string;

    @Column({ name: 'first_name', length: 60, nullable: false })
    first_name: string;

    @Column({ name: 'last_name', length: 60, nullable: true })
    last_name: string;
}
