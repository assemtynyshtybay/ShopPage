import React, {useCallback} from 'react';
import {Box} from '@mui/material';
import {Typography,FormControl,TextField,Button,MenuItem,Select,InputLabel} from '@mui/material';
import {Modal} from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../store/types/shop';
import {useForm, Controller} from "react-hook-form";
import {validatePhoneNumber} from "../utils/validatePhoneNumber";
import {validateEmail} from '../utils/validateEmail';
import {getFieldState} from "../utils/getFieldState";
import { getFieldNotRequired } from '../utils/getFieldNotReqired';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function OrderModal(){
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.shop.modalOpen)
  const {handleSubmit, control, reset} = useForm({
    mode: "onChange",
    defaultValues: {
        name: '',
        phone: '',
        email: '',
        comment: '',
        city: null
    }
  })
  const handleClose = useCallback(
    () => {
      dispatch({type: CLOSE_MODAL})
    },
    [dispatch],
  )
  const onSubmit = useCallback((values) => {
    alert('SUBMIT')
    console.log(values)
    dispatch({ type: CLOSE_MODAL })
    reset()
  }, [dispatch, reset])

  return(
    <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography variant="h5">Оформления заявки</Typography>
            <form style={{marginTop: '10px'}} onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{mb: 2}}>
                  <Controller
                      name="name"
                      control={control}
                      rules={{
                          minLength: 3,
                          required: 'Поле обязательное',
                      }}
                      render={({field, fieldState, formState}) => (
                          <TextField id="outlined-basic" label="Имя"
                                      {...getFieldState({ fieldState, formState })}
                                      variant="outlined" {...field} />
                      )}
                  />
              </FormControl>
              <FormControl fullWidth sx={{mb: 2}} required>
                <Controller
                    name="phone"
                    control={control}
                    rules={{
                        maxLength: 16,
                        required: 'Поле обязательное',
                        validate: (value) => {
                            if (validatePhoneNumber(value)) {
                                return true;
                            } else {
                                return 'Неверный номер телефона'
                            }
                        }
                    }}
                    render={({field,formState, fieldState}) => (
                        <TextField id="outlined-basic"
                                    label="Номер телефона"
                                    variant="outlined"
                                    {...getFieldState({ fieldState, formState })}
                                    {...field}
                        />
                    )}
                />
              </FormControl>
              <FormControl fullWidth sx={{mb: 2}}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                      validate: (value) => {
                        if(value){
                          if (validateEmail(value)) {
                              return true;
                          } else {
                              return 'Неверная почта'
                          } 
                        }
                         
                      }
                  }}
                    render={({field, formState, fieldState}) => (
                        <TextField id="outlined-basic"
                                    label="Эл. почта"
                                    variant="outlined"
                                    {...getFieldState({ fieldState, formState })}
                                    {...field}
                                
                        />
                                   
                                    
                    )}
                />
              </FormControl>
              <FormControl fullWidth sx={{mb: 2}}>
                  <Controller
                      name="comment"
                      control={control}
                      rules={{
                          minLength: 10 ,
                          message: "Длина больше 10",
                      }}
                      render={({field, fieldState, formState}) => (
                          <TextField id="outlined-basic" label="Комментарий"
                                      {...getFieldState({ fieldState, formState })}
                                      variant="outlined" {...field} />
                      )}
                  />
              </FormControl>
              <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel id="demo-simple-select-label">Город</InputLabel>
                <Controller
                    name="city"
                    control={control}
                    render={({field}) => (
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Город"
                            {...field}
                        >
                            <MenuItem value={10}>Астана</MenuItem>
                            <MenuItem value={20}>Алматы</MenuItem>
                            <MenuItem value={30}>Шымкент</MenuItem>
                        </Select>
                    )}
                />
              </FormControl>
              <Button variant="contained" type="submit">Отправить</Button>
            </form>
          </Box>
        </Modal>
  )
}
export default OrderModal;