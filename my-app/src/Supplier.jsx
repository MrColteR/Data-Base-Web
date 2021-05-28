import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddSupplierModal} from './AddSupplierModal';
import {EditSupplierModal} from './EditSupplierModal';
export class Supplier extends Component{
    
    constructor(props){
       super(props);
       this.state={deps:[], addModalShow:false, editModalShow:false} 
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'supplier')
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

    deleteSupplier(depid){
        if(window.confirm('Вы уверены?')){
            fetch(process.env.REACT_APP_API+'supplier/'+ depid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {deps, depid, depname, depaddress, depphone}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>SupplierID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Настройка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                        <tr key={dep.SupplierID}>
                            <td>{dep.SupplierID}</td>
                            <td>{dep.Name}</td>
                            <td>{dep.Address}</td>  
                            <td>{dep.Phone}</td>
                            <td>
<ButtonToolbar>
    <Button className="mr-2" variant="success"
    onClick={()=>this.setState({editModalShow:true, depid:dep.SupplierID, depname:dep.Name, depaddress:dep.Address, depphone:dep.Phone})}>
    Изменить
    </Button>

    <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteSupplier(dep.SupplierID)}>
    Удалить
    </Button>
    
    <EditSupplierModal show={this.state.editModalShow}
    onHide={editModalClose}
    depid={depid}
    depname={depname}
    depaddress={depaddress}
    depphone={depphone}/>


</ButtonToolbar>

                            </td>
                        </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Добавить поставщика    
                    </Button>

                    <AddSupplierModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddSupplierModal>

                    
                </ButtonToolbar>

            </div>
        )
    }
}