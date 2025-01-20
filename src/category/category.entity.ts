import { TransactionType } from 'src/enum';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/user/user.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

@Entity('category')
@Index(['user', 'categoryName'], { unique: true })
export class Category {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column({
        name: 'categoryName',
        type: 'nvarchar',
        length: 26,
        nullable: false,
    })
    categoryName: string;

    @Column({
        name: 'transType',
        type: 'varchar',
        length: 16,
        enum: TransactionType,
        nullable: false,
    })
    transType: TransactionType;

    @CreateDateColumn({ name: 'createdDate', type: 'datetime', nullable: true })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updatedDate', type: 'datetime', nullable: true })
    updatedDate: Date;

    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[];
}
