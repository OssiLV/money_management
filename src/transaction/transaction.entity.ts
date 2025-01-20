import { Category } from 'src/category/category.entity';
import { TransactionType } from 'src/enum';
import { Ledger } from 'src/ledger/ledger.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('transaction')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column({
        name: 'transType',
        type: 'varchar',
        length: 16,
        enum: TransactionType,
        nullable: false,
    })
    transType: TransactionType;

    @Column({ name: 'amount', type: 'money', default: 0 })
    amount: number;

    @Column({ name: 'transDate', type: 'datetime', nullable: false })
    transDate: Date;

    @CreateDateColumn({
        name: 'createdDate',
        type: 'datetime',
        nullable: false,
    })
    createdDate: Date;

    @UpdateDateColumn({
        name: 'updatedDate',
        type: 'datetime',
        nullable: false,
    })
    updatedDate: Date;

    @Column({ name: 'description', type: 'nvarchar', length: 255 })
    description: string;

    @ManyToOne(() => Category, (category) => category.transactions)
    category: Category;

    @ManyToOne(() => Ledger, (ledger) => ledger.transactions, {
        onDelete: 'CASCADE',
    })
    ledger: Ledger;
}
