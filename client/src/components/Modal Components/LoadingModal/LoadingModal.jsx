import React from 'react';
import Loadgo from '../../../../public/Loading.svg';
import './LoadingModal.scss';

function LoadingModal(props) {
    return <img className="LoadingModal" src={Loadgo} alt="Loading..." />;
}

export default LoadingModal;
