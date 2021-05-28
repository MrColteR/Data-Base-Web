import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddSupplyModal extends Component{
    constructor(props){
        super(props);
        this.handleSumbit=this.handleSumbit.bind(this);
    }

    handleSumbit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'supply',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SupplyID:null,
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
                            Добавление поставки
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSumbit}>
                                    <Form.Group controlId="SupplyAmount">
                                        <Form.Label>Кол-во поставок</Form.Label>
                                        <Form.Control type="text" name="SupplyAmount"required
                                        placeholder="Введите кол-во"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplyDate">
                                        <Form.Label>Дата поставки</Form.Label>
                                        <Form.Control type="text" name="SupplyDate"required
                                        placeholder="Введите дату"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplierID">
                                        <Form.Label>ID поставщика</Form.Label>
                                        <Form.Control type="text" name="SupplierID"required
                                        placeholder="Введите ID"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="sumbit">
                                            Добавить поставку
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