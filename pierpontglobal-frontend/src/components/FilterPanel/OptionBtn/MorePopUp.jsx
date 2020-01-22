import React from 'react';
import Modal from 'react-modal';
import './styles.css';

const customStyles = {
  content: {
    height: '70%',
    overflow: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '20',
  },
};

class MorePopUp extends React.Component {
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
    this.setState({ modalIsOpen: true }, () => {
      if (this.props.onSeeAll) {
        this.props.onSeeAll();
      }
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    // Implement search function
    const { options } = this.props;

    return (
      <div>
        <button
          className="border-0"
          type="button"
          style={{
            height: '14px',
            background: 'transparent',
            marginBottom: '20px',
            cursor: 'pointer',
            padding: '0 0 20px 0',
            color: 'rgb(62,120,192)',
          }}
          onClick={this.openModal}
        >
        (See all))
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <input
            className="border-0"
            style={{
              width: '300px',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              boxShadow: '0rem 0rem 1rem rgba(0, 0, 0, 0.15)',
            }}
            placeholder="Type search term"
          />
          {options}
        </Modal>
      </div>
    );
  }
}

export default MorePopUp;
