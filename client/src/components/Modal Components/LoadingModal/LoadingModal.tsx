import React from 'react';
import Loadgo from '../../../Images/Constants/Loading.svg'
import './LoadingModal.scss';

export interface LoadingModalProps {}

function LoadingModal(props: LoadingModalProps) {
    return <img className="LoadingModal" src={Loadgo} alt="Loading..." />;
}

export default LoadingModal;
