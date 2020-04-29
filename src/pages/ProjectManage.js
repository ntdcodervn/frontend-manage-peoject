import React, {useEffect , useState, useRef} from 'react';
import {Container,Spinner , Row , Col, Form, Table, Button} from 'react-bootstrap';
import FetchProject from './../api/FetchProject';
import moment from 'moment';
import alertCustom from './../utils/alertCustom';

const styles = {
   marginStyle : {marginTop : 10, marginBottom : 10}
}

function ProjectManage(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [checkUpdate, setCheckUpdate] = useState(false)
    const [listDataOri, setListDataOri] = useState([]);
    const [listData, setListData] = useState([]);

    const [idC ,setIdC] = useState();
    const [FormValue,setFormValue] = useState({
        nameProject : {
            value : '',
            error : false,
            msg : ''
        },
        description : {
            value : '',
            error : false,
            msg : ''
        },
        
    })

    const modalRef = useRef();

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        let getListData = await FetchProject.GetAllProject();
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
      
        if(!FormValue.nameProject.value) {
            setFormValue({
                ...FormValue,nameProject : {
                    ...FormValue.nameProject,
                    error : true,
                    msg : 'Project name is not empty'
                }
            })
     
        } else if(!FormValue.description.value) {
            setFormValue({
                ...FormValue,description : {
                    ...FormValue.description,
                    error : true,
                    msg : 'description is not empty'
                }
            })
        
        }else {
            setIsLoading(true)
          
            let postData = await FetchProject.AddNewProject(FormValue.nameProject.value,FormValue.description.value);
            if(postData) {
                if(postData.status == 200) {
                    resetState();
                    alertCustom('Successful','Add new Project successful','success',5000);
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
        console.log("haha");
        
        setCheckUpdate(false);
        setIdC(null);
        setFormValue({
            nameProject : {
                value : '',
                error : false,
                msg : ''
            },
            description : {
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

    const editData = (id,name,description) => {
        console.log(name,description);
        
        setIdC(id);
        setFormValue({
            nameProject : {
                value : name,
                error : false,
                msg : ''
            },
            description : {
                value : description,
                error : false,
                msg : ''
            },
        
        });
        setCheckUpdate(true);
    }

    const onEditData = async () => {
        if(!FormValue.nameProject.value) {
            setFormValue({
                ...FormValue,nameProject : {
                    ...FormValue.nameProject,
                    error : true,
                    msg : 'Project name is not empty'
                }
            })
     
        } else if(!FormValue.description.value) {
            setFormValue({
                ...FormValue,description : {
                    ...FormValue.description,
                    error : true,
                    msg : 'description is not empty'
                }
            })
        
        }else {
            setIsLoading(true)
           
            let postData = await FetchProject.EditProject(idC,FormValue.nameProject.value,FormValue.description.value);
            if(postData) {
                if(postData.status == 200) {
                    alertCustom('Successful','Edit new Project successful','success',5000);
                    getData();
                }else {
                    alertCustom('Error','Edit error please try again','danger',5000);
                   
                }
            }else {
                alertCustom('Error','Edit error please try again','danger',5000);
            }
            setIsLoading(false)

         
        }
    }

    const deleteProject = async (id) => {
        let deleteM = await FetchProject.DeleteProject(id);
        if(deleteM) {
            if(deleteM.status == 200) {
                alertCustom('Successful','Delete new Project successful','success',5000);
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
                    <h3>Project manage</h3>
                </Col>
                <Col  style={styles.marginStyle} md={12}>
                    <Form>
                        {checkUpdate ? <Form.Group as={Row} controlId="formPlaintextName">
                            <Form.Label column sm="2">
                            ID
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control disabled value={idC} name='nameProject' type="text" placeholder="Name" />
                            
                            </Col>
                        </Form.Group> : null}
                        <Form.Group as={Row} controlId="formPlaintextName">
                            <Form.Label column sm="2">
                            Name
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control value={FormValue.nameProject.value} onChange={onChangeText} name='nameProject' type="text" placeholder="Name" />
                            {FormValue.nameProject.error ? <p style={{color : 'red'}}>{FormValue.nameProject.msg}</p> : null}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextDescription">
                            <Form.Label column sm="2">
                            description
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control value={FormValue.description.value} onChange={onChangeText} name='description' type="text" placeholder="description" />
                            {FormValue.description.error ? <p style={{color : 'red'}}>{FormValue.description.msg}</p> : null}
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
                        Update Project
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
                        Add Project
                    </Button>}
                    
                </Col>
            </Row>
            <Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#ID</th>
                    <th>Name</th>
                    <th>description</th>
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
                                <td>{value.description}</td>
                                <td>{moment(value.birthday).format('DD-MM-YYYY')}</td>
                                <td>
                                    <Button onClick={() =>{window.location.href = `/projectDetail/${value._id}`}} variant="warning" style={{marginRight : 20}}>
                                        Details
                                    </Button>

                                    <Button onClick={() =>{editData(value._id, value.name,value.description,value.birthday)}} variant="primary" style={{marginRight : 20}}>
                                        Edit
                                    </Button>

                                    <Button onClick={() => {{deleteProject(value._id)}}} variant="danger">
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

export default ProjectManage;