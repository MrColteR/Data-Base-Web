import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddHistoryPriceModal} from './AddHistoryPriceModal';
import {EditHistoryPriceModal} from './EditHistoryPriceModal';
export class HistoryPrice extends Component{
    
    constructor(props){
       super(props);
       this.state={hiss:[], addModalShow:false, editModalShow:false} 
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'historyprice')
        .then(response=>response.json())
        .then(data=>{
            this.setState({hiss:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteSupplier(hisid){
        if(window.confirm('Вы уверены?')){
            fetch(process.env.REACT_APP_API+'historyprice/'+ hisid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {hiss, hisid, hisdate, hisprice, hissupid, hisdetid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID истории</th>
                            <th>Дата изменения цены</th>
                            <th>Новая цена</th>
                            <th>ID поставщика</th>
                            <th>ID детали</th>
                            <th>Настройка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hiss.map(his=>
                        <tr key={his.HistoryID}>
                            <td>{his.HistoryID}</td>
                            <td>{his.DateOfChangePrice}</td>
                            <td>{his.NewPrice}</td>  
                            <td>{his.SupplierID}</td>
                            <td>{his.DetailsID}</td>
                            <td>
<ButtonToolbar>
    <Button className="mr-2" variant="success"
    onClick={()=>this.setState({editModalShow:true,hisid:his.HistoryID, hisdate:his.DateOfChangePrice, hisprice:his.NewPrice, hissupid:his.SupplierID, hisdetid:his.DetailsID})}>
    Изменить
    </Button>

    <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteSupplier(his.SupplierID)}>
    Удалить
    </Button>
    
    <EditHistoryPriceModal show={this.state.editModalShow}
    onHide={editModalClose}
    hisid={hisid}
    hisdate={hisdate}
    hisprice={hisprice}
    hissupid={hissupid}
    hisdetid={hisdetid}/>


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

                    <AddHistoryPriceModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddHistoryPriceModal>

                    
                </ButtonToolbar>

            </div>
        )
    }
}