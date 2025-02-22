import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import SelectBalance from "../../components/SelectBalance";
import FormButtons from "../../components/FormButtons";
import { inputStyle } from "../../styles/global.style";
import React, { useState } from "react";
import { httpClient } from "../../utils/http";
import { useDispatch } from "react-redux";
import { createPayment } from "../../redux/payment.slice";
import { decreaseBalance } from "../../redux/balance.slice";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, initialStateErrMessage } from "../balance/NewBalance";
import { errorPaymentMessage } from "../../utils/paymentErrorMessages";

export default function NewPayment(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [balanceAccount, setBalanceAccount] = useState("")
    const [err, setErr] = useState<ErrorMessage>(initialStateErrMessage)
    const [loading, setLoading] = useState(false)
    const [newPayment, setNewPayment] = useState({
        name: "",
        description: "",
        amount: ""
    })
    const decreaseB = { id: "", userId:"", name: "", description:"", balanceAccount, amount: Number(newPayment.amount)}

    const handleCreatePayment = () => {
        setLoading(true)
        httpClient("payment", "POST", {
            payment: {
                name: newPayment.name, 
                description: newPayment.description,
                amount: newPayment.amount,
                balanceAccount: balanceAccount
            } 
        }).then(res => {
            dispatch(createPayment(res.data))
            dispatch(decreaseBalance(decreaseB))
            setLoading(false)
            navigate("/pagamentos", {
                state: {
                    message: "Pedido criado com sucesso",
                    open: true
                }
            })
        }).catch((err) => {
            const error = err.response.data.err
            setErr(errorPaymentMessage(error))
            setLoading(false)
        })
    }

    return(
        <Box component="section">
            <Title title="Criar pedido de pagamento" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                        error={err.field === "name"}
                        helperText={err.field === "name" && err.message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewPayment({...newPayment, name: e.target.value})
                            setErr(initialStateErrMessage)
                        }}
                    />
                    <TextField 
                        label="Descrição" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewPayment({...newPayment, description: e.target.value})
                            setErr(initialStateErrMessage)
                        }}
                    />
                    <TextField 
                        label="Valor" 
                        sx={inputStyle}
                        error={err.field === "amount"}
                        helperText={err.field === "amount" && err.message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewPayment({...newPayment, amount: e.target.value})
                            setErr(initialStateErrMessage)
                        }}
                    />
                    <SelectBalance 
                        setBalance={setBalanceAccount} 
                        err={err} 
                        setErr={setErr}
                    />
                </Box>
                <FormButtons 
                    path="/pagamentos" 
                    textButton="criar"
                    onClick={handleCreatePayment}
                    disabled={loading}
                />
            </FormContainer>
        </Box>
    )
}

