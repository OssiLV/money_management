import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/user/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Index,
} from 'typeorm';

@Entity('ledger')
@Index(['user', 'ledgerName'], { unique: true })
export class Ledger {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column({
        name: 'ledgerName',
        type: 'nvarchar',
        length: 50,
        nullable: false,
    })
    ledgerName: string;

    @Column({ name: 'description', type: 'nvarchar', length: 255 })
    description: string;

    @Column({ name: 'incomeTotalAmount', type: 'money' })
    incomeTotalAmount: number;

    @Column({ name: 'expenseTotalAmount', type: 'money' })
    expenseTotalAmount: number;

    @CreateDateColumn({
        name: 'createdDate',
        type: 'datetime',
        default: 0,
        nullable: true,
    })
    createdDate: Date;

    @UpdateDateColumn({
        name: 'updatedDate',
        type: 'datetime',
        default: 0,
        nullable: true,
    })
    updatedDate: Date;

    @OneToMany(() => Transaction, (transaction) => transaction.ledger, {
        cascade: ['remove'],
    })
    transactions: Transaction[];

    @ManyToOne(() => User, (user) => user.ledgers, {
        onDelete: 'CASCADE',
    })
    user: User;
}
