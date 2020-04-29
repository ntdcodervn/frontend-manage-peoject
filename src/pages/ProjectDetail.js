import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {Container,Row,Col, Table,Button} from 'react-bootstrap';
import FetchProject from './../api/FetchProject';
import moment from 'moment';
import AddMemberModal from './../components/AddMemberModal';

function ProjectDetail(props) {
    let {id} = useParams();
    let [dataCurrent,setDataCurrent] = useState({member : []});
    let modalRef = useRef();

    useEffect(() => {
       getData()
    },[])

    const getData = async () => {
        let getProjectById = await FetchProject.GetProjectById(id);
        console.log(getProjectById);
        
        if(getProjectById?.status == 200) {
            setDataCurrent(getProjectById.data);
        }else {
            // window.location.href = '/projectManage'
        }
    }

    const removeMemberFromProject = async (idMember) => {
        let removeMember = await FetchProject.RemoveFromProject(id,idMember);
        console.log(removeMember);
        
        if(removeMember?.status == 200) {
           getData()
        }else {
            // window.location.href = '/projectManage'
        }
    }
    
    return (
        <Container style={{marginBottom : 30, marginTop : 30}}>
            <Row>
                <Col md={12}>
                    <Col style={{marginBottom : 20, marginTop : 20}} md={12}>
                        <Button onClick={() => {{
                            window.location.href = '/projectManage'
                        }}} variant="warning">
                           {`<-`} Back to Manage project
                        </Button>
                    </Col>
                </Col>
                <Col md={12}>
                    <h3>
                       Project Detail ID : {id}
                    </h3>
                </Col>
                <Col md={12} style={{marginTop : 20}}>
                    <p>
                       <span style={{fontWeight : 'bold'}}>Name</span> : {dataCurrent.name}
                    </p>
                </Col>
                <Col md={12}>
                    <p>
                    <span style={{fontWeight : 'bold'}}>Description</span> : {dataCurrent.description}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h4 style={{textAlign : 'center', color : 'orange', marginBottom : 20, marginTop : 20}}>Member in project</h4> 
                </Col>
                <Col style={{marginBottom : 20, marginTop : 20}} md={12}>
                    <Button onClick={() => {{
                     modalRef.current.open()
                    }}} variant="primary">
                        Add member to the project
                    </Button>
                </Col>
                <Col md={12}>
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
                    {dataCurrent.member.map((value) => {
                        return (
                            <tr>
                                <td>{value._id}</td>
                                <td>{value.name}</td>
                                <td>{value.phone}</td>
                                <td>{moment(value.birthday).format('DD-MM-YYYY')}</td>
                                <td>
                                    <Button onClick={() => {removeMemberFromProject(value._id)}} variant="danger">
                                        Remove member from the project
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                   
                 
                </tbody>
                </Table>
                </Col>
            </Row>
            <AddMemberModal resetData={getData} ref={modalRef} id={id} arrayMemberExist={dataCurrent.member} />
        </Container>
    );
}

export default ProjectDetail;