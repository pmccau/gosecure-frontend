import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import DogTracker from './DogTracker';
import Lock from './Lock';
import IFrameModal from './IFrameModal';

export const NavigationBar = () => (
    <Navbar expand="lg">
        <table><tr><td className="button-cell">
            <Lock className="navicon" />
        </td><td className="button-cell">
            <DogTracker className="navicon" />
        </td><td>
            <IFrameModal className="navicon" src="http://192.168.86.213/admin/index.php" iconName="pi_logo" scrolling={true} />
        </td><td>
            <IFrameModal className="navicon" src="http://192.168.86.157/webcam/?action=streams" scrolling={false} iconName="octoprint" />
        </td></tr></table>
    </Navbar>
)
