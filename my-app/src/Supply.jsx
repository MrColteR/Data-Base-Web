import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddSupplyModal} from './AddSupplyModal';
import {EditSupplyModal} from './EditSupplyModal';
export class Supply extends Component{
    
    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false} 
     }
 
     refreshList(){
         fetch(process.env.REACT_APP_API+'supply')
         .then(response=>response.json())
         .then(data=>{
             this.setState({deps:data});
         }); 
     }
 
     componentDidMount(){
         this.refreshList();
     }
 
     componentDidUpdate(){
         this.refreshList();
     }
 
     deleteSupply(depid){
         if(window.confirm('Вы уверены?')){
             fetch(process.env.REACT_APP_API+'supply/'+ depid,{
                 method: 'DELETE',
                 header:{'Accept':'application/json',
                 'Content-Type':'application/json'}
             })
         }
     }
 
     render(){

         const {deps, depid, depamount, depdate, depsupid}=this.state;
         let addModalClose=()=>this.setState({addModalShow:false});
         let editModalClose=()=>this.setState({editModalShow:false});
         return(
             <div>
                 <Table className="mt-4" striped bordered hover size="sm">
                     <thead>
                         <tr>
                             <th>ID поставки</th>
                             <th>Кол-во</th>
                             <th>Дата</th>
                             <th>ID поставщика</th>
                             <th>Настройка</th>
                         </tr>
                     </thead>
                     <tbody>
                         {deps.map(dep=>
                         <tr key={dep.SupplyID}>
                             <td>{dep.SupplyID}</td>
                             <td>{dep.Amount}</td>
                             <td>{dep.Date}</td>  
                             <td>{dep.SupplierID}</td>
                             <td>
 <ButtonToolbar>
     <Button className="mr-2" variant="success"
     onClick={()=>this.setState({editModalShow:true, depid:dep.SupplyID, depamount:dep.Amount, depdate:dep.Date, depsupid:dep.SupplierID})}>
     Изменить
     </Button>
 
     <Button className="mr-2" variant="danger"
     onClick={()=>this.deleteSupply(dep.SupplyID)}>
     Удалить
     </Button>
     
     <EditSupplyModal show={this.state.editModalShow}
     onHide={editModalClose}
     depid={depid}
     depamount={depamount}
     depdate={depdate}
     depsupid={depsupid}/>
 
 
 </ButtonToolbar>
 
                             </td>
                         </tr>)}
                     </tbody>
                 </Table>
                 <ButtonToolbar>
                     <Button variant='primary'
                     onClick={()=>this.setState({addModalShow:true})}>
                     Добавить поставку    
                     </Button>
 
                     <AddSupplyModal show={this.state.addModalShow}
                     onHide={addModalClose}></AddSupplyModal>
 
                     
                 </ButtonToolbar>
 
             </div>
       )
     }
 }