import { TransactionType } from 'src/enum';

export function isValidTransactionType(value: string): boolean {
    return Object.values(TransactionType).includes(value as TransactionType);
}
