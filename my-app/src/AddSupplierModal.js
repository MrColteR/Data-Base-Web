import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddSupplierModal extends Component{
    constructor(props){
        super(props);
        this.handleSumbit=this.handleSumbit.bind(this);
    }

    handleSumbit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'supplier',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SupplierID:null,
                SupplierName:event.target.SupplierName.value,
                SupplierAddress:event.target.SupplierAddress.value,
                SupplierPhone:event.target.SupplierPhone.value
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
                            Добавление поставщика
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSumbit}>
                                    <Form.Group controlId="SupplierName">
                                        <Form.Label>Имя поставщика</Form.Label>
                                        <Form.Control type="text" name="SupplierName"required
                                        placeholder="Введите имя"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplierAddress">
                                        <Form.Label>Адрес поставщика</Form.Label>
                                        <Form.Control type="text" name="SupplierAddress"required
                                        placeholder="Введите адрес"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplierPhone">
                                        <Form.Label>Номер поставщика</Form.Label>
                                        <Form.Control type="text" name="SupplierPhone"required
                                        placeholder="Введите номер"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="sumbit">
                                            Добавить поставщика
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