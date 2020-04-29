import axios from 'axios';
import BASE_URL from './../utils/BASE_URL';

const GetAllMember = async () => {
    try {
        let getData = await axios.get(`${BASE_URL}/members/getAllMember`);
        return getData.data;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}


const AddNewMember = async (name,phone,birthday) => {
    try {
        let getData = await axios.post(`${BASE_URL}/members/addNewMember`,{
            name,
            phone,
            birthday
        });
       
        return getData.data;
       
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const EditMember = async (id,name,phone,birthday) => {
    try {
        let getData = await axios.post(`${BASE_URL}/members/updateMember`,{
            id,
            name,
            phone,
            birthday
        });
       
        return getData.data;
       
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const DeleteMember = async (id) => {
    try {
        let getData = await axios.get(`${BASE_URL}/members/deleteMember/${id}`,);
       
        return getData.data;
       
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}


export default {
    GetAllMember,
    AddNewMember,
    DeleteMember,
    EditMember
}