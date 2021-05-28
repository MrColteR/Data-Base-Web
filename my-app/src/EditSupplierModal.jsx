import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class EditSupplierModal extends Component{
    constructor(props){
        super(props);
        this.handleSumbit=this.handleSumbit.bind(this);
    }

    handleSumbit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'supplier',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SupplierID:event.target.SupplierID.value,
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
                            Изменение степик
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSumbit}>
                                    
                                    <Form.Group controlId="SupplierID">
                                        <Form.Label>ID поставки</Form.Label>
                                        <Form.Control type="text" name="SupplierID"required
                                        disabled
                                        defaultValue={this.props.supid}
                                        placeholder="Введите ID"/>
                                    </Form.Group>


                                    <Form.Group controlId="SupplierName">
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control type="text" name="SupplierName"required
                                        defaultValue={this.props.supname}
                                        placeholder="Введите имя"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplierAddress">
                                        <Form.Label>Адрес</Form.Label>
                                        <Form.Control type="text" name="SupplierAddress"required
                                        defaultValue={this.props.supaddress}
                                        placeholder="Введите адрес"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplierPhone">
                                        <Form.Label>Телефон</Form.Label>
                                        <Form.Control type="text" name="SupplierPhone"required
                                        defaultValue={this.props.supphone}
                                        placeholder="Введите телефон"/>
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