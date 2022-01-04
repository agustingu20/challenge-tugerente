import React from 'react'
import { Dropdown, DropdownButton, FormControl, InputGroup } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DropdownSearch() {
    return (
        <div className='d-flex justify-content-center mt-4'>
            <div className='w-50'>
                <InputGroup className="mb-3">
                    <FormControl aria-label="Text input with dropdown button" />
                    <DropdownButton
                        variant="outline-secondary"
                        title="Dropdown"
                        id="input-group-dropdown-2"
                        align="end"
                    >
                        <Dropdown.Item href="#">Action</Dropdown.Item>
                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Separated link</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </div>
        </div>
    )
}
