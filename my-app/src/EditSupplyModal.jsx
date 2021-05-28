import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class EditSupplyModal extends Component{
    constructor(props){
        super(props);
        this.handleSumbit=this.handleSumbit.bind(this);
    }

    handleSumbit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'supply',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SupplyID:event.target.SupplyID.value,
                SupplyAmount:event.target.SupplyAmount.value,
                SupplyDate:event.target.SupplyDate.value,
                SupplierID:event.target.SupplierID.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    render(){
        return(
            <div className='container'>
                <Modal
                {...this.props }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Изменение поставки
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSumbit}>
                                    
                                    <Form.Group controlId="SupplyID">
                                        <Form.Label>ID Поставщика</Form.Label>
                                        <Form.Control type="text" name="SupplyID"required
                                        disabled
                                        defaultValue={this.props.depid}
                                        placeholder="Введите ID"/>
                                    </Form.Group>


                                    <Form.Group controlId="SupplyAmount">
                                        <Form.Label>Кол-во поставок</Form.Label>
                                        <Form.Control type="text" name="SupplyAmount"required
                                        defaultValue={this.props.depamount}
                                        placeholder="Введите кол-во"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplyDate">
                                        <Form.Label>Дату поставки</Form.Label>
                                        <Form.Control type="text" name="SupplyDate"required
                                        defaultValue={this.props.depdate}
                                        placeholder="Введите дату"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplierID">
                                        <Form.Label>ID поставщика</Form.Label>
                                        <Form.Control type="text" name="SupplierID"required
                                        defaultValue={this.props.depsupid}
                                        placeholder="Введите ID"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="sumbit">
                                            Изменить поставщика
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Закрыть</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }

}