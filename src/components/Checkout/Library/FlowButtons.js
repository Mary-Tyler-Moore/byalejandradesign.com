import React from 'react';
import { kebabToSentence, capitalize, compose } from 'smalldash';
import { withRouter } from 'react-router-dom';
// style
import './flow-buttons.sass';

const kebabToTitle = compose(capitalize, kebabToSentence);

const FlowButtons = ({ prev, next, history }) => (
    <footer className="flow-buttons__section">
        <button
            className="flow-buttons__button"
            onClick={() => {
                window.scrollTo({ top: 0 });
                history.push(`/checkout/${prev}`);
            }}
        >
            Back to {kebabToTitle(prev)}
        </button>
        <button
            className="flow-buttons__button"
            onClick={() => {
                window.scrollTo({ top: 0 });
                history.push(`/checkout/${next}`);
            }}
        >
            Continue to {kebabToTitle(next)}
        </button>
    </footer>
);

export default withRouter(FlowButtons);
