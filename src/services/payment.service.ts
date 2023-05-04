import { instance } from "@/api/interceptor";
import { IPaymentResponse } from "@/types/payment.interface";

const PAYMENT = "payment";

export const PaymentService = {
    async createPayment(amount: number) {
        return await instance.post<IPaymentResponse>(
            PAYMENT,
            {amount}
        )
    }
}
