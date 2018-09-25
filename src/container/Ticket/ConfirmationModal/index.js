import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {Type} from '../RateBox';
import NumberFormat from 'react-number-format';

const ConfirmationModal = ({ type, amount, currency, clickRate, toggleModal, showModal }) =>
  (<Modal isOpen={showModal} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>Receipt</ModalHeader>
    <ModalBody>
      <span>You {type === Type.BUY ? "bought" : "sold"} </span>
      <NumberFormat
          value={(amount * clickRate).toFixed(5)}
          displayType={'text'}
          thousandSeparator={true}
        />
        <span> {currency.source}</span>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggleModal}>OK</Button>{' '}
    </ModalFooter>
  </Modal>);


ConfirmationModal.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.number,
  currency: PropTypes.shape({
    source: PropTypes.string.isRequired,
  }),
  toggleModal: PropTypes.func.isRequired,
  clickRate: PropTypes.number,
}

export default ConfirmationModal;
