import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit})=>{
    return(
        <div className='detact'>
            <p className='f3'>
                {'This Magic Brain will detact faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
            <div className='center form pa4 br3 shadow-5'>
            <input className='f4 pa2 w-70 center' type='text' onChange ={onInputChange}/>
            <button 
            className='f4 white bg-light-purple link ph3 pv2 dib w-30 grow center'
            onClick = {onButtonSubmit}
            >Detact</button>
            </div>
            </div>

        </div>
    );
}

export default ImageLinkForm;