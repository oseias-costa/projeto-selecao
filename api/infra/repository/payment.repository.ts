import { Payment } from "../../domain/payment.entity";
import { Balance } from "../../domain/balance.entity";
import { UserInfo } from "../../domain/user.entity";
import { connection } from "../db/mysql";

interface PaymentRepositoryInterface {
    CreatePayment(payment: Payment, balance: Balance): Promise<any>
    GetallPayments(userInfo: UserInfo): Promise<any>
    DeletePayment(payment: Payment, balance: Balance): Promise<any>
    UpdatePaymentName(payment: Payment, newName: string): Promise<any>
    VerifyBalanceAmount(payment: Payment): Promise<any>
    GetPaymentById(id: string): Promise<any>
}

export class PaymentRepository implements PaymentRepositoryInterface {

    async CreatePayment(payment: Payment, balance: Balance): Promise<any> {
        const newBalanceAmount = balance.totalValue - payment.amount
        const newBalanceUsed: number = Number(balance.valueUsed) + Number(payment.amount)

        const [rows] = await connection.promise().query(
            `INSERT INTO payment (id, userId, name, description, amount, balanceAccount)
             VALUES (?, ?, ?, ?, ?, ?);

             UPDATE balance SET totalValue = ?, valueUsed = ? WHERE id = ?;`, 
            [
                payment.id, 
                payment.userId, 
                payment.name, 
                payment.description, 
                payment.amount,
                payment.balanceAccount,
                newBalanceAmount,
                newBalanceUsed,
                payment.balanceAccount
            ]
        )

        return rows
    }

    async GetallPayments(userInfo: UserInfo): Promise<any>{
        const [rows] = await connection.promise().query(
            `SELECT * FROM payment WHERE userId = ?`, [userInfo.id]
        )
        return rows
    }

    async GetPaymentById(id: string): Promise<any>{
        const [rows] = await connection.promise().query(
            `SELECT * FROM payment WHERE id = ?`, [id]
        )

        let result: any = rows
        if(result.length !== 0){
            return result[0]
        }
        return rows
    }

    async DeletePayment(payment: Payment, balance: Balance): Promise<any>{
        const totalValue: number = Number(balance.totalValue) + Number(payment.amount)
        const valueUsed: number = Number(balance.valueUsed) - Number(payment.amount)

        const [rows] = await connection.promise().query(
            `DELETE FROM payment WHERE id = ?;
             UPDATE balance SET totalValue = ?, valueUsed = ? WHERE id = ?`, 
             [payment.id, totalValue, valueUsed, payment.balanceAccount]
        )

        return rows
    }

    async UpdatePaymentName(payment: Payment, newName: string): Promise<any>{
        const [rows] = await connection.promise().query(
            `UPDATE payment SET name = ? WHERE id = ?`, [newName, payment.id]
        )

        return rows
    }

    async VerifyBalanceAmount(payment: Payment): Promise<any>{
        const [rows] = await connection.promise().query(
            `SELECT * FROM balance WHERE id = ?`, [payment.balanceAccount]
        )
        
        let result: any = rows
        return result[0]
    }
}