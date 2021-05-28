import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddDetailsModal extends Component{
    constructor(props){
        super(props);
        this.handleSumbit=this.handleSumbit.bind(this);
    }

    handleSumbit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'details',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DetailsID:null,
                DetailsArticle:event.target.DetailsArticle.value,
                DetailsPrice:event.target.DetailsPrice.value,
                DetailsNote:event.target.DetailsNote.value,
                DetailsName:event.target.DetailsName.value
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
                                    <Form.Group controlId="DetailsArticle">
                                        <Form.Label>Артикул</Form.Label>
                                        <Form.Control type="text" name="DetailsArticle"required
                                        placeholder="Введите артикул"/>
                                    </Form.Group>

                                    <Form.Group controlId="DetailsPrice">
                                        <Form.Label>Цена</Form.Label>
                                        <Form.Control type="text" name="DetailsPrice"required
                                        placeholder="Введите цену"/>
                                    </Form.Group>

                                    <Form.Group controlId="DetailsNote">
                                        <Form.Label>Описание</Form.Label>
                                        <Form.Control type="text" name="DetailsNote"required
                                        placeholder="Введите описание"/>
                                    </Form.Group>

                                    <Form.Group controlId="DetailsName">
                                        <Form.Label>Название</Form.Label>
                                        <Form.Control type="text" name="DetailsName"required
                                        placeholder="Введите название"/>
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