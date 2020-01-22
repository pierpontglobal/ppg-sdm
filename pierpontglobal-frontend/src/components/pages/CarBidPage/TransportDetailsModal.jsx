import React from 'react';
import Modal from 'react-modal';
import './styles.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    height: '350px',
    overflow: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '20',
    borderRadius: 0,
    padding: 0,
  },
};

function rowWithTitle(title, value) {
  return (
    <div>
      {title}
          :
      <span className="last-in-row">{value}</span>
    </div>
  );
}

const handlePlaceHolder = {
  estimatedTotal: 0,
  msrp: 0,
  shipping: 695.0,
  pierpontFee: 495.0,
  freightFowaridng: 150.0,
  transport: 229.45,
};

class TransportDetailsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button
          className="border-0"
          type="button"
          style={{
            display: 'flex',
            height: '14px',
            background: 'transparent',
            marginBottom: '0',
            cursor: 'pointer',
            padding: '0',
            color: 'rgb(62,120,192)',
          }}
          onClick={this.openModal}
        >
          {`$ ${handlePlaceHolder.transport.toFixed(2)}`}
          <i className="fas fa-info-circle ml-2" style={{ color: '#3e78c0', fontSize: '20px', cursor: 'pointer' }} />
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div id="priceBreackDown-1">
            <div id="priceBreackDown-1-heading">
              Cost breakdown
            </div>
            <div id="priceBreackDown-1-body">
              {rowWithTitle(<span style={{ fontWeight: '900', fontSize: '15px' }}>Estimated total</span>, <span style={{ fontWeight: '900', fontSize: '15px' }}>USD$ 29,889.45</span>)}
              <hr />
              {rowWithTitle('Unit cost', '$ 24,000.00')}
              {rowWithTitle('Taxes', '$ 4,320.00')}
              {rowWithTitle('Shipping', `$${handlePlaceHolder.shipping.toFixed(2)}`)}
              {rowWithTitle('Fee', `$${handlePlaceHolder.pierpontFee.toFixed(2)}`)}
              {rowWithTitle('Processing', `$${handlePlaceHolder.freightFowaridng.toFixed(2)}`)}
              {rowWithTitle('Transport', `$${handlePlaceHolder.transport.toFixed(2)}`)}
              <hr />
              {rowWithTitle(<span style={{ fontWeight: '900' }}>Required deposit</span>, <span style={{ fontWeight: '900' }}>USD$ 2,400.00</span>)}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


export default TransportDetailsModal;
