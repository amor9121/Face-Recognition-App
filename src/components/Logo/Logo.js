import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = ()=>{
    return(      
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{max:25}} style={{ height:150, width:150}}>
                <div className='Tilt-inner pa3'>
                    <img style={{paddingTop:'8px'}}src="https://png.icons8.com/doodle/96/000000/smart-.png" alt='smart'/>
                </div>
            </Tilt>
        </div>    
    );
}

export default Logo;