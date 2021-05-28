import React,{Component} from 'react';
import Scrin from './schema.png';
export class Home extends Component{
    
    render(){
        return(
            <div className="Image mt-5 d-flex justify-content-center ">
                <img src={Scrin}/>
            </div>
        )
    }
}