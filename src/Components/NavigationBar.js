import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import DogTracker from './DogTracker';
import Lock from './Lock';

export const NavigationBar = () => (
    <Navbar expand="lg">
        <table><tr><td className="button-cell">
            <Lock className="navicon" />
        </td><td className="button-cell">
            <DogTracker className="navicon" />
        </td></tr></table>
    </Navbar>
)
