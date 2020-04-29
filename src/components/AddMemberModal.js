import React, {forwardRef,useImperativeHandle, useState,useEffect } from 'react';
import {Modal, Button, Col, Row, Container,Table} from 'react-bootstrap';
import moment from 'moment';
import FetchMember from './../api/FetchMember';
import FetchProject from '../api/FetchProject';

const AddMemberModal = forwardRef((props,ref) => { {
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [members,setMember] = useState([]);

    const close = () => {
        setIsModalVisible(false);
    }
    const open = () => {
        setIsModalVisible(true);
    }
  

    useImperativeHandle(ref,()=>{
        return {
            open: () => {open()},
            close : () => {close()}
        }
    });

    useEffect(() => {
      getData()
    },[props])
    
    const getData = async () => {
      let getListData = await FetchMember.GetAllMember();
      console.log(getListData);
      let newList = getListData.data.map((value) => {
        let checkExist = props.arrayMemberExist.filter((element) => element._id == value._id );
          console.log(value._id);
          let check = false;
          if(checkExist.length != 0) {
            check = true
          }
          return {
            ...value,
            check
          }
      })
      setMember(newList);
      console.log(newList);
      
 
  }

  const addMemberToProject = async (idMember) => {
    console.log(props.id , idMember);
    let addMember = await FetchProject.AssignMemberToProject(props.id,idMember);
    console.log(addMember);
    
    if(addMember?.status == 200) {
      
    }else {

    }
    props.resetData()
    getData();
  }

    return (
        <Modal show={isModalVisible} size="lg" onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>List User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
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
                    {members.map((value) => {
                        return (
                            <tr>
                                <td>{value._id}</td>
                                <td>{value.name}</td>
                                <td>{value.phone}</td>
                                <td>{moment(value.birthday).format('DD-MM-YYYY')}</td>
                                <td>
                                    <Button disabled={value.check} onClick={() => {addMemberToProject(value._id)}} variant={!value.check ? "warning" : "dark"}>
                                         {value.check ? "Added" : "Add"}
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                   
                 
                </tbody>
                </Table>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
}})

export default AddMemberModal;