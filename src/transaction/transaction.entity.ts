import { Category } from 'src/category/category.entity';
import { TransactionType } from 'src/enum';
import { User } from 'src/user/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
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

    @CreateDateColumn({ name: 'transDate', type: 'datetime', nullable: false })
    transDate: Date;

    @Column({ name: 'description', type: 'nvarchar', length: 255 })
    description: string;

    @ManyToOne(() => Category, (category) => category.Id)
    @JoinColumn({
        name: 'categoryId',
        foreignKeyConstraintName: 'FK_transactions_category',
    })
    category: Category;

    @ManyToOne(() => User, (user) => user.Id)
    @JoinColumn({
        name: 'userId',
        foreignKeyConstraintName: 'FK_transactions_user',
    })
    user: User;
}
