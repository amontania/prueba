import React from 'react';
import {useDropzone} from 'react-dropzone';



  function DropZone(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return   (
      <div> 
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag and drop la firma , o click para seleccionar</p>
      </div>
      <aside>
            <ul>{files}</ul>
      </aside>
    </section>
    </div>
  );
}




export default DropZone;