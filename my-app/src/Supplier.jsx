import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddSupplierModal} from './AddSupplierModal';
import {EditSupplierModal} from './EditSupplierModal';
export class Supplier extends Component{
    
    constructor(props){
       super(props);
       this.state={sups:[], addModalShow:false, editModalShow:false} 
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'supplier')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sups:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteSupplier(supid){
        if(window.confirm('Вы уверены?')){
            fetch(process.env.REACT_APP_API+'historyprice/'+ supid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {sups, supid, supname, supaddress, supphone}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID поставки</th>
                            <th>Имя</th>
                            <th>Адрес</th>
                            <th>Телефон</th>
                            <th>Настройка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sups.map(sup=>
                        <tr key={sup.SupplierID}>
                            <td>{sup.SupplierID}</td>
                            <td>{sup.Name}</td>
                            <td>{sup.Address}</td>  
                            <td>{sup.Phone}</td>
                            <td>
<ButtonToolbar>
    <Button className="mr-2" variant="success"
    onClick={()=>this.setState({editModalShow:true,supid:sup.SupplierID, supname:sup.Name, supaddress:sup.Address, supphone:sup.Phone})}>
    Изменить
    </Button>

    <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteSupplier(sup.SupplierID)}>
    Удалить
    </Button>
    
    <EditSupplierModal show={this.state.editModalShow}
    onHide={editModalClose}
    supid={supid}
    supname={supname}
    supaddress={supaddress}
    supphone={supphone}/>


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