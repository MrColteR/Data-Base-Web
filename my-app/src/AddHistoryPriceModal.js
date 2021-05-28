import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddHistoryPriceModal extends Component{
    constructor(props){
        super(props);
        this.handleSumbit=this.handleSumbit.bind(this);
    }

    handleSumbit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'historyprice',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                HistoryID:null,
                DateOfChangePrice:event.target.DateOfChangePrice.value,
                NewPrice:event.target.NewPrice.value,
                SupplierID:event.target.SupplierID.value,
                DetailsID:event.target.DetailsID.value
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
                            Добавление истории
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSumbit}>
                                    <Form.Group controlId="DateOfChangePrice">
                                        <Form.Label>Дата изменения цены</Form.Label>
                                        <Form.Control type="text" name="DateOfChangePrice"required
                                        placeholder="Введите дату"/>
                                    </Form.Group>

                                    <Form.Group controlId="NewPrice">
                                        <Form.Label>Новая цена</Form.Label>
                                        <Form.Control type="text" name="NewPrice"required
                                        placeholder="Введите цену"/>
                                    </Form.Group>

                                    <Form.Group controlId="SupplierID">
                                        <Form.Label>ID поставщика</Form.Label>
                                        <Form.Control type="text" name="SupplierID"required
                                        placeholder="Введите ID"/>
                                    </Form.Group>

                                    <Form.Group controlId="DetailsID">
                                        <Form.Label>ID детали</Form.Label>
                                        <Form.Control type="text" name="DetailsID"required
                                        placeholder="Введите ID"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="sumbit">
                                            Добавить историю
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