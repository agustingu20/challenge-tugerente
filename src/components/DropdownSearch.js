import React, { useEffect, useState } from 'react'
import { Button, Collapse, FormControl, InputGroup, Modal } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './dropDownSearch.css'
import axios from 'axios';

export default function DropdownSearch() {
    const [customer, setCustomer] = useState([])
    const [customerFilter, setCustomerFilter] = useState([])
    const [currentSkip, setCurrentSkip] = useState(0)
    const [selectedCustomer, setSelectedCustomer] = useState({})

    const [open, setOpen] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (e) => {
        const customerId = e.target.value;
        const customerSelected = customer.find((cliente) => cliente.id === JSON.parse(customerId))
        setSelectedCustomer(customerSelected)
        setShow(true);
    }


    const handleChange = (e) => {
        const { value } = e.target;
        const customerFiltered = customer.filter(
            (customer) => {
                const nombreEnMinuscula = customer.name.toLowerCase()
                return nombreEnMinuscula.includes(value)
            })
        setCustomerFilter(customerFiltered);
    }

    useEffect(() => {
        const fetchCustomer = async () => {
            const apikey = process.env.REACT_APP_APIKEY
            const filters = `{ "filter": { "filters": [{ "field": "reference_name", "operator": "contains", "ignoreCase": true, "value": "" }, { "field": "nit", "operator": "contains", "ignoreCase": true, "value": "" }, { "field": "name", "operator": "contains", "ignoreCase": true, "value": "" }, { "field": "reference_name", "operator": "contains", "ignoreCase": true, "value": "" }], "logic": "or" }, "skip": ${currentSkip}, "take": 20 }`
            const url = process.env.REACT_APP_API_URL
            const fetchedCustomer = await axios.get(url,
                {
                    headers: {
                        'apikey': apikey,
                        'Data-Operations': filters
                    }
                }
            )
            setCustomer(fetchedCustomer.data.results)
            setCustomerFilter(fetchedCustomer.data.results)
            // }
        }
        window.onscroll = function miFuncion() {
            var scroll = document.getElementById("divScroll").scrollTop;
            if (scroll > 365) {
                setCurrentSkip(currentSkip + 20)
            }
        }
        fetchCustomer()
    }, [currentSkip])

    return (
        <div className='d-flex justify-content-center mt-4'>
            <div className='w-50'>
                <InputGroup
                    className="mb-3"
                    onChange={handleChange}
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                >
                    <FormControl aria-label="Text input with dropdown button" />
                    <Button
                        variant="outline-primary"
                        className='btn-sm'
                        onClick={() => setOpen(!open)
                        }>
                        <img src="https://icongr.am/entypo/chevron-small-down.svg?size=30&color=000000" alt="buttonDropDown" />
                    </Button>
                </InputGroup>
                {customerFilter.length > 0 &&
                    <Collapse in={open} className='h-50'>
                        <div className='customerFilterDiv' onScroll={window.onscroll} id="divScroll">
                            <div>
                                {
                                    customerFilter.map((customer) => (
                                        <button
                                            className='btn btn-sm btn-outline-success d-flex d-column m-2'
                                            onClick={handleShow}
                                            value={`${customer.id}`}
                                            key={`customer-${customer.id}`}
                                        >
                                            {customer.name}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </Collapse>
                }

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCustomer.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li>Ciudad: {selectedCustomer.city}</li>
                            <li>País: {selectedCustomer.country}</li>
                            <li>Teléfono: {selectedCustomer.contact_phone}</li>
                            <li>Email: {selectedCustomer.business_email}</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        </div >
    )
}
