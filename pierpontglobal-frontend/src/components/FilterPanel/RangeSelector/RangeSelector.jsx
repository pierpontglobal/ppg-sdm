import React from 'react';
import './styles.css';
import posed from 'react-pose';

const ScaleIndicator = posed.div({
  draggable: 'x',
  dragBounds: ({ limitLeft, limitRight }) => ({ left: limitLeft, right: limitRight }),
  moving: {
    x: ({ i, width }) => i * width,
  },
  steady: {
    x: ({ i, width }) => i * width,
  },
});

function reOrganize(items) {
  items.sort((a, b) => parseInt(a.key, 10) - parseInt(b.key, 10));
  return items;
}

function getMaxCount(items) {
  if (items[0] === undefined) {
    return 0;
  }
  let biggerNumber = items[0].doc_count;
  for (let i = 0; i < items.length; i += 1) {
    biggerNumber = biggerNumber > items[i].doc_count ? biggerNumber : items[i].doc_count;
  }
  return biggerNumber;
}

function getIndicatorPosition(indicatorId) {
  const indicatorLeftMargin = window.document.getElementById(indicatorId).getClientRects()[0].left;
  const indicatorContainerLeftMargin = window.document.getElementById('scaleContainer').getClientRects()[0].left;
  const xPosition = indicatorLeftMargin - indicatorContainerLeftMargin;
  return xPosition;
}

function isNewSameLegthOldItems(newItems, oldItems) {
  if (newItems.length !== oldItems.length) {
    return false;
  }
  return true;
}

function isNewSameAsOldItems(newItems, oldItems) {
  if (!isNewSameLegthOldItems(newItems, oldItems)) {
    console.log('something 1');
    return false;
  }

  newItems = reOrganize(newItems);
  oldItems = reOrganize(oldItems);

  const newKeys = (newItems.map(key => key.key));
  const oldKeys = (oldItems.map(key => key.key));
  if (JSON.stringify(newKeys) !== JSON.stringify(oldKeys)) {
    return false;
  }

  const newDocCounts = (newItems.map(key => key.doc_count));
  const oldDocCounts = (oldItems.map(key => key.doc_count));
  if (JSON.stringify(newDocCounts) !== JSON.stringify(oldDocCounts)) {
    return false;
  }

  return true;
}

class RangeSelector extends React.Component {
  constructor(props) {
    super(props);

    const {
      items,
      width,
      selectedYears,
    } = this.props;

    const elementWidth = width || 240;
    const itemsNumber = items.length;
    const indicatorWidth = elementWidth / (itemsNumber + 1);

    this.state = {
      min: 0,
      max: itemsNumber,
      width: elementWidth,
      indicatorWidth,
      rightIndicatorPose: 'steady',
      leftIndicatorPose: 'steady',
      items,
      selectedYears,
    };

    this.getItemPosition = this.getItemPosition.bind(this);
    this.updateIndicaroPositions = this.updateIndicaroPositions.bind(this);
  }

  componentDidMount() {
    // this.setInitialMinMax(this.props.selectedYears);

  }

  componentWillReceiveProps(nextProps) {
    if (!isNewSameAsOldItems(nextProps.items, this.state.items)) {
      console.log(nextProps.items);
      console.log(this.state.items);
      const itemsNumber = nextProps.items.length;
      const indicatorWidth = this.state.width / (itemsNumber + 1);

      this.setState({
        items: nextProps.items,
        indicatorWidth,
        max: nextProps.items.length,
      }, this.updateIndicaroPositions);
    }
  }

  getItemPosition(key) {
    const { items } = this.state;
    let position = -1;
    items.forEach((item, i) => {
      if (item.key === key) {
        position = i;
      }
    });
    return position;
  }

  updateIndicaroPositions() {
    this.setState({
      leftIndicatorPose: 'moving',
      rightIndicatorPose: 'moving',
    }, () => {
      this.setState({
        leftIndicatorPose: 'steady',
        rightIndicatorPose: 'steady',
      }, () => this.props.onBoundChanged(this.state.min, this.state.max));
    });
  }

  render() {
    let {
      width, indicatorWidth, min, max,
      rightIndicatorPose, leftIndicatorPose, items,
    } = this.state;

    const maxCount = getMaxCount(items);
    items = reOrganize(items);

    return (
      <div>
        <div style={{
          marginTop: '20px',
          width: `${width}px`,
          height: '80px',
          position: 'relative',
        }}
        >
          {items.map((item, i) => (
            <div
              data-content={item.key}
              data-number={item.doc_count}
              className="column-item"
              key={i}
              style={{
                height: `${item.doc_count * 100 / (maxCount)}%`,
                position: 'absolute',
                width: `${indicatorWidth}px`,
                backgroundColor: (i > min - 1 && i < max) ? 'rgba(59, 68, 75, 0.7)' : 'rgba(59, 68, 75, 0.5)',
                bottom: '0px',
                left: `${(i + 1) * indicatorWidth}px`,
              }}
            />
          ))}

        </div>
        <div
          id="scaleContainer"
          style={{
            marginTop: '0px',
            position: 'relative',
            backgroundColor: '#dedede',
            height: '30px',
            display: 'flex',
            width: `${width}px`,
          }}
        >
          <ScaleIndicator
            className="indicator"
            limitLeft={0}
            limitRight={(max - 1) * indicatorWidth}
            i={this.state.min}
            width={indicatorWidth}
            pose={leftIndicatorPose}
            id="min"
            style={{
              width: `${indicatorWidth}px`,
              height: '30px',
              backgroundColor: 'rgb(59, 68, 75)',
              position: 'absolute',
              textAlign: 'center',
              lineHeight: '30px',
              fontSize: '9px',
              fontWeight: '900',
              color: 'white',
            }}
            onDragEnd={() => {
              const xPosition = getIndicatorPosition('min');
              this.setState({
                min: Math.round(xPosition / this.state.indicatorWidth),
              }, this.updateIndicaroPositions);
            }}
          >
            MIN
          </ScaleIndicator>

          <ScaleIndicator
            className="indicator"
            limitLeft={(min + 1) * indicatorWidth}
            limitRight={width - indicatorWidth}
            i={this.state.max}
            width={indicatorWidth}
            pose={rightIndicatorPose}
            id="max"
            style={{
              width: `${indicatorWidth}px`,
              height: '30px',
              backgroundColor: 'rgb(59, 68, 75)',
              position: 'absolute',
              textAlign: 'center',
              lineHeight: '30px',
              fontSize: '9px',
              fontWeight: '900',
              color: 'white',
            }}
            onDragEnd={() => {
              const xPosition = getIndicatorPosition('max');
              this.setState({
                max: Math.round(xPosition / this.state.indicatorWidth),
              }, this.updateIndicaroPositions);
            }}
          >
            MAX
          </ScaleIndicator>
        </div>
      </div>
    );
  }
}

export default RangeSelector;
