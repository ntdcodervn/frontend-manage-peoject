import React, {useEffect , useState, useRef} from 'react';
import {Container,Spinner , Row , Col, Form, Table, Button} from 'react-bootstrap';
import FetchMember from './../api/FetchMember';
import moment from 'moment';
import alertCustom from './../utils/alertCustom';

const styles = {
   marginStyle : {marginTop : 10, marginBottom : 10}
}

function MemberManage(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [checkUpdate, setCheckUpdate] = useState(false)
    const [listDataOri, setListDataOri] = useState([]);
    const [listData, setListData] = useState([]);
    const [onConfirm,setOnConfirm] = useState(() => {})

    const [idC ,setIdC] = useState();
    const [FormValue,setFormValue] = useState({
        nameMember : {
            value : '',
            error : false,
            msg : ''
        },
        phone : {
            value : '',
            error : false,
            msg : ''
        },
        birthday : {
            value : '',
            error : false,
            msg : ''
        }
    })

    const modalRef = useRef();

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        let getListData = await FetchMember.GetAllMember();
        setListDataOri(getListData.data);
        setListData(getListData.data);
    }

    const onChangeText = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormValue({...FormValue,[name] : {
            value,
            error : '',
            msg : ''
        }})
        
        
    }

    const onSubmit = async () => {
      
        if(!FormValue.nameMember.value) {
            setFormValue({
                ...FormValue,nameMember : {
                    ...FormValue.nameMember,
                    error : true,
                    msg : 'Member name is not empty'
                }
            })
     
        } else if(!FormValue.phone.value) {
            setFormValue({
                ...FormValue,phone : {
                    ...FormValue.phone,
                    error : true,
                    msg : 'Phone is not empty'
                }
            })
        
        }else if(!Number.isInteger(Number(FormValue.phone.value))) {
            setFormValue({
                ...FormValue,phone : {
                    ...FormValue.phone,
                    error : true,
                    msg : 'Phone is invalid'
                }
            })
          
        }else if(!FormValue.birthday.value) {
            setFormValue({
                ...FormValue,birthday : {
                    ...FormValue.birthday,
                    error : true,
                    msg : 'Birthday have not chosen'
                }
            })
          
        }else {
            setIsLoading(true)
            let changeData = new Date(FormValue.birthday.value).getTime();
            let postData = await FetchMember.AddNewMember(FormValue.nameMember.value,FormValue.phone.value,changeData);
            if(postData) {
                if(postData.status == 200) {
                    alertCustom('Successful','Add new member successful','success',5000);
                    getData();
                }else {
                    alertCustom('Error','Add error please try again','danger',5000);
                   
                }
            }else {
                alertCustom('Error','Add error please try again','danger',5000);
            }
            setIsLoading(false)

         
        }
    } 

    const resetState = () => {
        setCheckUpdate(false);
        setIdC(null);
        setFormValue({
            nameMember : {
                value : '',
                error : false,
                msg : ''
            },
            phone : {
                value : '',
                error : false,
                msg : ''
            },
            birthday : {
                value : '',
                error : false,
                msg : ''
            }
        });
    }

    const editData = (id,name,phone,birthday) => {
        console.log(name,phone);
        
        setIdC(id);
        setFormValue({
            nameMember : {
                value : name,
                error : false,
                msg : ''
            },
            phone : {
                value : phone,
                error : false,
                msg : ''
            },
            birthday : {
                value : moment(birthday).format('YYYY-MM-DD'),
                error : false,
                msg : ''
            }
        });
        setCheckUpdate(true);
    }

    const onEditData = async () => {
        if(!FormValue.nameMember.value) {
            setFormValue({
                ...FormValue,nameMember : {
                    ...FormValue.nameMember,
                    error : true,
                    msg : 'Member name is not empty'
                }
            })
     
        } else if(!FormValue.phone.value) {
            setFormValue({
                ...FormValue,phone : {
                    ...FormValue.phone,
                    error : true,
                    msg : 'Phone is not empty'
                }
            })
        
        }else if(!Number.isInteger(Number(FormValue.phone.value))) {
            setFormValue({
                ...FormValue,phone : {
                    ...FormValue.phone,
                    error : true,
                    msg : 'Phone is invalid'
                }
            })
          
        }else if(!FormValue.birthday.value) {
            setFormValue({
                ...FormValue,birthday : {
                    ...FormValue.birthday,
                    error : true,
                    msg : 'Birthday have not chosen'
                }
            })
          
        }else {
            setIsLoading(true)
            let changeData = new Date(FormValue.birthday.value).getTime();
            let postData = await FetchMember.EditMember(idC,FormValue.nameMember.value,FormValue.phone.value,changeData);
            if(postData) {
                if(postData.status == 200) {
                    alertCustom('Successful','Edit new member successful','success',5000);
                    getData();
                    resetState()
                }else {
                    alertCustom('Error','Edit error please try again','danger',5000);
                   
                }
            }else {
                alertCustom('Error','Edit error please try again','danger',5000);
            }
            setIsLoading(false)

         
        }
    }

    const deleteMember = async (id) => {
        let deleteM = await FetchMember.DeleteMember(id);
        if(deleteM) {
            if(deleteM.status == 200) {
                alertCustom('Successful','Delete new member successful','success',5000);
                getData();
            }else {
                alertCustom('Error','Delete error please try again','danger',5000);
               
            }
        }else {
            alertCustom('Error','Delete error please try again','danger',5000);
        }
    }

    return (
        <Container >
            <Row style={styles.marginStyle}>
                <Col md={12}>
                    <h3>Member manage</h3>
                </Col>
                <Col  style={styles.marginStyle} md={12}>
                    <Form>
                        {checkUpdate ? <Form.Group as={Row} controlId="formPlaintextName">
                            <Form.Label column sm="2">
                            ID
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control disabled value={idC} name='nameMember' type="text" placeholder="Name" />
                            
                            </Col>
                        </Form.Group> : null}
                        <Form.Group as={Row} controlId="formPlaintextName">
                            <Form.Label column sm="2">
                            Name
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control value={FormValue.nameMember.value} onChange={onChangeText} name='nameMember' type="text" placeholder="Name" />
                            {FormValue.nameMember.error ? <p style={{color : 'red'}}>{FormValue.nameMember.msg}</p> : null}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPhone">
                            <Form.Label column sm="2">
                            Phone
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control value={FormValue.phone.value} onChange={onChangeText} name='phone' type="text" placeholder="Phone" />
                            {FormValue.phone.error ? <p style={{color : 'red'}}>{FormValue.phone.msg}</p> : null}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextBirthday">
                            <Form.Label column sm="2">
                            Birthday
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control value={FormValue.birthday.value} onChange={onChangeText} name='birthday' type="date" placeholder="Birthday" />
                            {FormValue.birthday.error ? <p style={{color : 'red'}}>{FormValue.birthday.msg}</p> : null}
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={12}>
                    {checkUpdate ? (<><Button 
                        style={{marginRight : 10}}
                        disabled={isLoading}
                        variant='warning'
                        onClick={onEditData}
                    >
                        {isLoading ?  <Spinner style={{marginRight : 10}} size="sm" animation="border" /> : null}
                        Update Member
                    </Button> 
                    <Button 
                        disabled={isLoading}
                        onClick={() =>{ resetState()}}
                        variant='dark'
                    >
                        {isLoading ?  <Spinner style={{marginRight : 10}} size="sm" animation="border" /> : null}
                        Cancel
                    </Button></>) 
                    : <Button 
                        disabled={isLoading}
                        onClick={onSubmit}
                    >
                        {isLoading ?  <Spinner style={{marginRight : 10}} size="sm" animation="border" /> : null}
                        Add Member
                    </Button>}
                    
                </Col>
            </Row>
            <Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Birthday</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((value) => {
                        return (
                            <tr>
                                <td>{value._id}</td>
                                <td>{value.name}</td>
                                <td>{value.phone}</td>
                                <td>{moment(value.birthday).format('DD-MM-YYYY')}</td>
                                <td>
                                    <Button onClick={() =>{editData(value._id, value.name,value.phone,value.birthday)}} variant="success" style={{marginRight : 20}}>
                                        Edit
                                    </Button>

                                    <Button onClick={() => {{deleteMember(value._id)}}} variant="danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                   
                 
                </tbody>
                </Table>
                
            </Row>
        </Container>
    );
}

export default MemberManage;