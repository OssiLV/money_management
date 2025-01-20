import { Category } from 'src/category/category.entity';
import { CurrencyType } from 'src/enum';
import { Ledger } from 'src/ledger/ledger.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column({ name: 'email', type: 'varchar', nullable: false })
    email: string;

    @Column({ name: 'password', length: 35, nullable: false })
    password: string;

    @Column({ name: 'first_name', length: 60, nullable: false })
    firstName: string;

    @Column({ name: 'last_name', length: 60, nullable: true })
    lastName: string;

    @Column({
        name: 'currency',
        type: 'varchar',
        length: 10,
        enum: CurrencyType,
        default: CurrencyType.VND,
    })
    currency: CurrencyType;

    @Column({ name: 'balance', type: 'money', default: 0 })
    balance: number;

    @CreateDateColumn({ name: 'createdDate', type: 'datetime', nullable: true })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updatedDate', type: 'datetime', nullable: true })
    updatedDate: Date;

    @OneToMany(() => Category, (category) => category.user, {
        cascade: ['remove'],
    })
    categories: Category[];

    @OneToMany(() => Ledger, (ledger) => ledger.user, {
        cascade: ['remove'],
    })
    ledgers: Ledger[];
}
