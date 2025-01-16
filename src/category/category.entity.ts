import { TransactionType } from 'src/enum';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/user/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Index,
    OneToMany,
} from 'typeorm';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column({
        name: 'categoryName',
        type: 'nvarchar',
        length: 26,
        nullable: false,
        unique: true,
    })
    @Index({ unique: true })
    categoryName: string;

    @Column({
        name: 'transType',
        type: 'varchar',
        length: 16,
        enum: TransactionType,
        nullable: false,
    })
    transType: TransactionType;

    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({
        name: 'userId',
        foreignKeyConstraintName: 'FK_user_categories',
    })
    user: User | null;

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[];
}
