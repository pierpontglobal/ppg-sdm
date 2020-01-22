import React from 'react';
import './style.css';

const headerStyle = {
  height: '72px',
  fontSize: '1.5em',
  fontWeight: 600,
  lineHeight: 1.33,
  color: ' #000000',
};

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.autoCloseModal = this.autoCloseModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      open: this.props.show,
    });
  }

  autoCloseModal(e) {
    e.stopPropagation();
    const { className } = e.target;
    if (className.includes('my-modal') || className.includes('fa-times')) {
      this.setState({ open: false });
      try {
        this.props.notifyClosed();
      } catch (error) {
        // Nothing to do here
      }
    }
  }

  render() {
    const current = this.state.open ? 'my-modal my-display-block' : 'my-modal my-display-none';
    return (
      <div
        onClick={this.autoCloseModal}
        className={current}
        style={{
          zIndex: 2000,
        }}
      >
        <section style={{ height: this.props.height }} className="d-flex my-modal-main">
          <div className="d-flex flex-column flex-fill">
            <div style={{ backgroundColor: '#fafafa' }}>
              <h1
                className="px-3 pt-3 mb-0"
                style={headerStyle}
              >
                {this.props.title}
              </h1>
              <i
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: '#35444F',
                  cursor: 'pointer',
                }}
                onClick={this.autoCloseModal}
                className="fas fa-times"
              />
            </div>
            <div className="px-3 pb-3 pt-2 d-flex flex-column flex-fill justify-content-between">
              {this.props.children}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
