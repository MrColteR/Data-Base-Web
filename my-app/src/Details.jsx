import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDetailsModal} from './AddDetailsModal';
import {EditDetailsModal} from './EditDetailsModal';
export class Details extends Component{
    
    constructor(props){
       super(props);
       this.state={dets:[], addModalShow:false, editModalShow:false} 
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'details')
        .then(response=>response.json())
        .then(data=>{
            this.setState({dets:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteSupplier(detid){
        if(window.confirm('Вы уверены?')){
            fetch(process.env.REACT_APP_API+'supplier/'+ detid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {dets, detid, detart, detprice, detnote, detname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID детали</th>
                            <th>Артикул</th>
                            <th>Цена</th>
                            <th>Описание</th>
                            <th>Название</th>
                            <th>Настройка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dets.map(det=>
                        <tr key={det.DetailsID}>
                            <td>{det.DetailsID}</td>
                            <td>{det.Article}</td>
                            <td>{det.Price}</td>  
                            <td>{det.Note}</td>
                            <td>{det.Name}</td>
                            <td>
<ButtonToolbar>
    <Button className="mr-2" variant="success"
    onClick={()=>this.setState({editModalShow:true,detid:det.DetailsID, detart:det.Article, detprice:det.Price, detnote:det.Note, detname:det.Name})}>
    Изменить
    </Button>

    <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteSupplier(det.SupplierID)}>
    Удалить
    </Button>
    
    <EditDetailsModal show={this.state.editModalShow}
    onHide={editModalClose}
    detid={detid}
    detart={detart}
    detprice={detprice}
    detnote={detnote}
    detname={detname}/>


</ButtonToolbar>

                            </td>
                        </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Добавить деталь    
                    </Button>

                    <AddDetailsModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddDetailsModal>

                    
                </ButtonToolbar>

            </div>
        )
    }
}