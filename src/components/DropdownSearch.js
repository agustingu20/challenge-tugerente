import React, { useEffect, useState } from 'react'
import { Button, Collapse, FormControl, InputGroup, Modal } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './dropDownSearch.css'
import axios from 'axios';

export default function DropdownSearch() {
    const [customer, setCustomer] = useState([])
    console.log("DropdownSearch ~ customer", customer)
    const [customerFilter, setCustomerFilter] = useState([])
    console.log("DropdownSearch ~ customerFilter", customerFilter)
    const [currentSkip, setCurrentSkip] = useState(0)
    console.log("DropdownSearch ~ currentSkip", currentSkip)
    // const [selectedCustomer, setSelectedCustomer] = useState({})

    const [open, setOpen] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleChange = (e) => {
        const { value } = e.target;
        const customerFiltered = customer.filter(
            (customer) => {
                const nombreEnMinuscula = customer.name.toLowerCase()
                return nombreEnMinuscula.includes(value)
            })
        setCustomerFilter(customerFiltered);
        console.log("handleChange ~ value", value)
    }

    useEffect(() => {
        const fetchCustomer = async () => {
            const apikey = "zq06klJqT3V0NSbmmu4FP6YG0IWvio2HmvFMaHro"
            const filters = `{ "filter": { "filters": [{ "field": "reference_name", "operator": "contains", "ignoreCase": true, "value": "" }, { "field": "nit", "operator": "contains", "ignoreCase": true, "value": "" }, { "field": "name", "operator": "contains", "ignoreCase": true, "value": "" }, { "field": "reference_name", "operator": "contains", "ignoreCase": true, "value": "" }], "logic": "or" }, "skip": ${currentSkip}, "take": 20 }`
            const url = "https://back.implementaconbubo.com/v1/sales/customer/"
            const fetchedCustomer = await axios.get(url,
                {
                    headers: {
                        'apikey': apikey,
                        'Data-Operations': filters
                    }
                }
            )
            console.log("handleChange ~ fetchedCustomer", fetchedCustomer.data.results)
            setCustomer(fetchedCustomer.data.results)
            setCustomerFilter(fetchedCustomer.data.results)
            // }
        }
        window.onscroll = function miFuncion() {
            var scroll = document.getElementById("divScroll").scrollTop;
            if (scroll > 358) {
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
                                            className='btn btn-sm btn-outline-success d-flex d-column mt-2'
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
                        <Modal.Title>{ }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        </div >
    )
}
