import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import FormButtons from "../../components/FormButtons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { inputStyle } from "../../styles/global.style";
import { httpClient } from "../../utils/http";
import { updatePaymentName } from "../../redux/payment.slice";
import { RootState } from "../../redux/store";
import { errorPaymentMessage } from "../../utils/paymentErrorMessages";
import { ErrorMessage, initialStateErrMessage } from "../balance/NewBalance";

export default function UpdatePayment(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const [ newName, setNewName ] = useState(state.name)
    const [loading, setLoading] = useState(false)
    const balance = useSelector((state:RootState) => state.balance)
    const findBalance = balance.balance.filter((item) => item.id === state.balanceAccount)
    const [err, setErr] = useState<ErrorMessage>(initialStateErrMessage)
    

    const handleUpdatePaymentName = () => {
        setLoading(true)
        httpClient("payment", "PATCH", {payment: state, newName})
            .then((res) => {
                dispatch(updatePaymentName(res.data))
                setLoading(false)
                navigate("/pagamentos", {
                    state: {
                        message: "Pedido criado com sucesso",
                        open: true
                    }
                })}).catch((err) => {
                    const error = err.response.data.err
                    setErr(errorPaymentMessage(error))
                    setLoading(false)
                })
    }

    return(
        <Box component="section">
            <Title title="Editar pedido de pagamento" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                        value={newName}
                        error={err.field === "name"}
                        helperText={err.field === "name" && err.message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setErr(initialStateErrMessage)
                            setNewName(e.target.value)}}
                    />
                    <TextField 
                        disabled={true} 
                        label="Descrição" 
                        sx={inputStyle}
                        value={state.description}
                    />
                    <TextField 
                        disabled={true} 
                        label="Valor" 
                        sx={inputStyle}
                        value={state.amount}
                    />
                    <FormControl sx={{minWidth: "100%" }} disabled>
                        <InputLabel id="demo-select-small-label">Saldo utilizado</InputLabel>
                        <Select
                            value={"item"}
                            label="Saldo utilizado"
                        >
                            <MenuItem value={"item"}>
                                {findBalance[0]?.balanceName} - R$ {findBalance[0]?.totalValue.toFixed(2)}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <FormButtons 
                    path="/pagamentos"
                    textButton="salvar"
                    onClick={handleUpdatePaymentName} 
                    disabled={loading}
                />
            </FormContainer>
        </Box>
    )
}