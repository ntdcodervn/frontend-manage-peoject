import axios from 'axios';
import BASE_URL from './../utils/BASE_URL';

const GetAllProject = async () => {
    try {
        let getData = await axios.get(`${BASE_URL}/Projects/getAllProject`);
        return getData.data;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const GetProjectById = async (id) => {
    try {
        let getData = await axios.get(`${BASE_URL}/Projects/getDetailProjectById/${id}`);
        return getData.data;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}


const AddNewProject = async (name,description) => {
    try {
        let getData = await axios.post(`${BASE_URL}/Projects/addNewProject`,{
            name,
            description,
          
        });
       
        return getData.data;
       
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const EditProject = async (id,name,description) => {
    try {
        let getData = await axios.post(`${BASE_URL}/Projects/updateProject`,{
            id,
            name,
            description,
            
        });
       
        return getData.data;
       
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const DeleteProject = async (id) => {
    try {
        let getData = await axios.get(`${BASE_URL}/Projects/deleteProject/${id}`,);
       
        return getData.data;
       
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const AssignMemberToProject = async (idProject, idMember) => {
    try {
        let getData = await axios.post(`${BASE_URL}/projects/assignMemberToProject`,{
            idProject,
            idMember
        });
        return getData.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const RemoveFromProject = async (idProject, idMember) => {
    try {
        let getData = await axios.post(`${BASE_URL}/projects/removeFromProject`,{
            idProject,
            idMember
        });
        return getData.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {
    GetAllProject,
    AddNewProject,
    DeleteProject,
    EditProject,
    GetProjectById,
    AssignMemberToProject,
    RemoveFromProject
}