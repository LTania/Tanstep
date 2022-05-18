import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PoorWord, PoorWordsField, Popup, RequirementsComponent} from "./poorWords";



it('RequirementsComponent renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RequirementsComponent
        classes={{}}
        viewWords={[]}
        requirements={[]}
    />, div);
});

it('PoorWord renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PoorWord
        classes={{}}
        word={''}
        onClick={() => {}}
        color={''}
    />, div);
});

it('PoorWordsField renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PoorWordsField
        classes={{}}
        activeRequirementWords={null}
        addRemovePoorWord={() => {}}
        selectedPoorWords={[]}
    />, div);
});

it('Popup renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Popup
        classes={{}}
        poorWords={[]}
        popupCoords={{}}
        pwClicked={() => {}}
        addOrRemovePw={() => {}}
    />, div);
});

it('RequirementsComponent renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RequirementsComponent
        classes={{}}
        viewWords={[]}
        requirements={[]}
    />, div);
});

it('Popup renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Popup
        classes={{}}
        poorWords={[]}
        popupCoords={{}}
        pwClicked={null}
        addOrRemovePw={null}
    />, div);
});



