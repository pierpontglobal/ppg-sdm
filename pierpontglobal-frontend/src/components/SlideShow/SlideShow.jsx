import React from 'react';
import { Carousel } from 'react-bootstrap';
import './styles.css';

class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      direction: null,
      nextIcon: <span><i className="fas fa-chevron-right" /></span>,
      prevIcon: <span><i className="fas fa-chevron-left" /></span>,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }


  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const { nextIcon, prevIcon } = this.state;

    const { images } = this.props;
    const carImages = [];

    for (let i = 0; i < images.length; i += 1) {
      carImages.push(
        <Carousel.Item key={i}>
          <div style={{
            backgroundImage: `url(${images[i]})`,
            width: '212px',
            height: '120px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          />
        </Carousel.Item>,
      );
    }

    return (
      <Carousel
        nextIcon={nextIcon}
        prevIcon={prevIcon}
        index={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect}
        slide={false}
      >
        { carImages }
      </Carousel>
    );
  }
}

export default SlideShow;
