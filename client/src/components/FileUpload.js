import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';
import  GetClientIp  from './PublicIp';



const FileUpload = () => {
    const[file,setFile]= useState('');
    const[fileName, setFilename]= useState('Elige pdf');
    const[uploadedFile,setUploadedFile]= useState({});
    const[message,setMessage]= useState('');
    const [uploadPercentage,setUploadPercentage]= useState(0);
    const[ip,setIp]=useState('');
    
   
   
  
    const onChange= e =>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
   

    useEffect( () => {
        async function fetchIp(){
          const result =  await GetClientIp();
          setIp(result);
        }
        fetchIp();
     
       
      }, []);
    
     

    const onSubmit = async e => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('file',file);
        formData.append('ip', ip);
  
        try{
            const res = await axios.post('/upload',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

       
                onUploadProgress : progressEvent => {
                        setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100)/ progressEvent.total)))

                        // Clear setUploadPercentage
                        setTimeout(() => {
                            setUploadPercentage(0)
                            }, 8000);

                },

                         
            }) ;
            const { fileName,filePath}  = res.data;
          
           
        
           
          
            
         
 
             setMessage('Pdf Firmado');
          //   const res2 = await axios.get('/fetch-pdf',fileName);
            
       
          
           setUploadedFile({fileName,filePath});
            
          
 
        }catch (err){
            
            if(err.response.status === 500){
                setMessage( 'There was a problem with the server!!')
            }else{
                setMessage(err.response.data.msg);
            }
            
        }

    }


    
    
    return (
        <Fragment>
            {message ? <Message msg={message}/>:null}
            <form onSubmit={onSubmit}>
                
                 <div className="form-group">
                 
                    <input type="file" className="form-control" title="Elegir un pdf"  id="customFileInput"  onChange={onChange} accept=".pdf" lang="es" required/>
          
                 </div>
            


                 <div className="d-grid gap-2">
                     <Progress percentage={uploadPercentage}/>
                      <input type="submit" value="Firmar" className="btn btn-primary "/>
                 </div>  

            
                
            </form>
            

            {uploadedFile ? <div className="row ">
                <div className="col-md-12 m-auto">
                    <h3 className="text-center">{ uploadedFile.fileName }</h3>
                        <iframe title={ uploadedFile.fileNames} src={ uploadedFile.filePath } id="ifra"/>
                   
                  
                    
                </div>
                

            </div>: null}
            
        </Fragment>
    )
}

export default FileUpload

