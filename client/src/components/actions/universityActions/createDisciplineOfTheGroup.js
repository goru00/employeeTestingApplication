import { useEffect, useState, useRef } from 'react';
import { Button, 
    Container, 
    Tooltip, 
    Typography, 
    Grid, 
    FormControl, 
    InputLabel, 
    Select, 
    OutlinedInput,
    MenuItem,
    ListItem, 
    Avatar,
    ListItemText
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import useModal from '../../../hooks/useModal';
import useMessage from '../../../hooks/useMessage';
import useLoading from '../../../hooks/useLoading';
import { useFormik } from 'formik';

import disciplineServices from '../../../services/university.services/discipline.services';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import { createDisciplineOfTheGroup } from '../../../actions/university/discipline';
import { Box } from '@mui/system';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ModalCreateDisciplineOfTheGroup = (props) => {
    const { disciplines, validation, loading, LoadAnimation } = props;
    const [message] = useMessage();
    const form = useRef();

    return (
        loading ? LoadAnimation : (
            <Box
                component="main"
                sx={{
                    alignItemS: 'center',
                    display: 'flex',
                    flexGrow: 1
                }}
            >
                <Container>
                    {message}
                    <Box
                        sx={{ my: 3 }}
                    >
                        <Typography variant="h5">
                            Добавление дисциплины в учебную группу
                        </Typography>
                        <Typography>
                            Для добавления дисциплины в группу необходимо правильно заполнить поля ниже
                        </Typography>
                    </Box>
                    <form
                        onSubmit={validation.handleSubmit}
                        ref={form}
                    >
                        <Box
                            sx={{ flexGrow: 1 }}
                        >
                            <Grid
                                container
                                rowSpacing={{ xs: 2, md: 4 }}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid
                                    container
                                    item={true}
                                >
                                    <FormControl
                                        sx={{
                                            m: 1,
                                            width: '100%'
                                        }}
                                    >
                                        <InputLabel
                                            id="multiple-disciplines-name"
                                        >
                                            Выбрать дисциплину
                                        </InputLabel>
                                        <Select
                                            labelId="multiple-discipline-name"
                                            id="multiple-discipline"
                                            value={validation.values.id}
                                            name="id"
                                            onChange={validation.handleChange}
                                            input={<OutlinedInput label="id" />}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                                                    }
                                                }
                                            }}
                                        >
                                            {
                                                disciplines && disciplines.map((discipline, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            value={discipline.id}
                                                        >
                                                            <ListItem
                                                                key={discipline.id}
                                                                component="div"
                                                                disablePadding
                                                            >
                                                                <ListItemText
                                                                    sx={{
                                                                        marginLeft: 2
                                                                    }}
                                                                >{discipline.name}</ListItemText>
                                                            </ListItem>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Box
                                    sx={{
                                        py: 2
                                    }}
                                >
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Добавить дисциплину
                                    </Button>
                                </Box>
                            </Grid>
                        </Box>
                    </form>
                </Container>
            </Box>
        )
    )

}

function CreateDisciplineOfTheGroup({props}) {
    const [disciplines, setDisciplines] = useState([]);
    const { targetGroup } = props;
    const { loading, handleLoadingStop, handleLoadingStart, LoadAnimation } = useLoading();
    const dispatch = useDispatch();

    const params = useParams();

    const validation = useFormik({
        initialValues: {
            id: ''
        },
        validationSchema: Yup.object({
            id: Yup
                .string()
        }),
        onSubmit: (values) => {
            const { id } = values;
            handleLoadingStart();
            dispatch(createDisciplineOfTheGroup(id, targetGroup)).then(() => {
                console.log('successfully');
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                handleLoadingStop();
                handleClose();
                window.location.reload();
            })
        }
    })

    useEffect(() => {
        disciplineServices.getDisciplines().then(res => {
            let newDisciplines = [];
            res.data.disciplines.forEach(discipline => {
                newDisciplines.push({
                    id: discipline.id,
                    name: discipline.name
                });
            })
            setDisciplines(newDisciplines);
        })
    }, []);

    const { content, handleOpen, handleClose } = useModal(ModalCreateDisciplineOfTheGroup({disciplines, validation, loading, LoadAnimation}));

    return (
        <div className="createStudentOfTheGroup">
            <Tooltip title="Добавить студента в группу">
                <Button
                    aria-label="reduce"
                    onClick={handleOpen}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Tooltip>
            {content}
        </div>
    )
}

export default CreateDisciplineOfTheGroup;