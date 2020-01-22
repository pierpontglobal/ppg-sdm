import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import Item from './Item/Item';
import OptionBtn from './OptionBtn/OptionBtn';
import RangeSelector from './RangeSelector/RangeSelector';
import ArrowIcon from '@material-ui/icons/KeyboardArrowDown';

const ArrowWrapper = styled.div`
  padding: 8px;
  cursor: pointer;
  transition: all 0.15s;
  transform: ${ props => props.toggle ? 'rotate(180deg)' : 'rotate(0deg)' };
  & > svg {
    font-size: 1.5rem;
  }
`;

const FilterPanelWrapper = styled.div`
  background-color: #FFF;
  height: 100%;
  overflow: auto;
  width: 100%;
  @media only screen and (max-width: 768px) {
    height: 100%,
  };
`;

const ExpandableDiv = posed.div({
  retracted: {
    height: '58px',
  },
  expanded: {
    height: '200px',
  },
});

class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    const {
      availableArguments,
      params,
    } = props;

    this.state = {};

    if (params) {
      this.state = {
        availableArguments,
        q: params.q ? params.q : '',
        maker: params.maker ? params.maker.split(',') : [],
        model: params.model ? params.model.split(',') : [],
        trim: params.trim ? params.trim.split(',') : [],
        year: params.year ? params.year.split(',') : [],
        color: params.color ? params.color.split(',') : [],
        engine: params.engine ? params.engine.split(',') : [],
        yearTogle: false,
      };
    }

    this.searchWithParams = this.searchWithParams.bind(this);
    this.onBoundChanged = this.onBoundChanged.bind(this);
  }

  componentWillMount() {
    const { intl } = this.props;
    this.setState({
      text: {
        maker: intl.formatMessage({ id: 'marketplace.maker' }),
        model: intl.formatMessage({ id: 'marketplace.model' }),
        trim: intl.formatMessage({ id: 'marketplace.trim' }),
        year: intl.formatMessage({ id: 'marketplace.year' }),
        color: intl.formatMessage({ id: 'marketplace.color' }),
        engine: intl.formatMessage({ id: 'marketplace.engine' }),
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.availableArguments !== this.state.availableArguments) {
      this.setState({ availableArguments: nextProps.availableArguments });
    }
  }

  onBoundChanged(min, max) {
    const years = [];
    for (let i = min; i < max; i += 1) {
      years.push(this.state.availableArguments.year.buckets[i].key);
    }
    this.setState({
      year: years,
    }, () => {
      this.searchWithParams(null, true, null);
    });
  }


  searchWithParams(origin, add, key) {
    const {
      q, maker, model, trim, year, color, engine,
    } = this.state;

    const searchables = {
      q,
      maker,
      model,
      trim,
      year,
      color,
      engine,
    };

    switch (origin) {
      case 'maker':
        if (add) {
          searchables.maker.push(key);
        } else {
          searchables.maker.splice(maker.indexOf(key), 1);
        }
        break;
      case 'model':
        if (add) {
          searchables.model.push(key);
        } else {
          searchables.model.splice(model.indexOf(key), 1);
        }
        break;
      case 'trim':
        if (add) {
          searchables.trim.push(key);
        } else {
          searchables.trim.splice(trim.indexOf(key), 1);
        }
        break;
      case 'color':
        if (add) {
          searchables.color.push(key);
        } else {
          searchables.color.splice(color.indexOf(key), 1);
        }
        break;
      case 'engine':
        if (add) {
          searchables.engine.push(key);
        } else {
          searchables.engine.splice(engine.indexOf(key), 1);
        }
        break;
      default:
        break;
    }

    let str = '';
    Object.keys(searchables).forEach((searchable) => {
      if (str !== '') {
        str += '&';
      }
      str += `${searchable}=${encodeURIComponent(searchables[searchable])}`;
    });
    
    this.props.getCars();
    if (this.props.handleFilterChange) {
      this.props.handleFilterChange(searchables);
    }
  }

  render() {
    const {
      availableArguments, maker, model, trim, year, color, engine, yearTogle, text,
    } = this.state;
    const { onSeeAll } = this.props;
    let makersArray = [];
    let modelsArray = [];
    let trimArray = [];
    let yearArray = [];
    let colorArray = [];
    let engineArray = [];

    if (availableArguments) {
      const makersObject = availableArguments.maker_name;
      const modelsObject = availableArguments.model_name;
      const trimObject = availableArguments.trim;
      const yearObject = availableArguments.year;
      const colorObject = availableArguments.color;
      const engineObject = availableArguments.engine;

      makersArray = makersObject ? makersObject.buckets : [];
      modelsArray = modelsObject ? modelsObject.buckets : [];
      trimArray = trimObject ? trimObject.buckets : [];
      yearArray = yearObject ? yearObject.buckets : [];
      colorArray = colorObject ? colorObject.buckets : [];
      engineArray = engineObject ? engineObject.buckets : [];
    }

    return (
      <FilterPanelWrapper>
        <Item name={text.maker}>
          <OptionBtn
            selected={maker}
            values={makersArray}
            origin="maker"
            onChange={this.searchWithParams}
            onSeeAll={onSeeAll}
          />
        </Item>
        <Item name={text.model}>
          <OptionBtn
            selected={model}
            values={modelsArray}
            origin="model"
            onChange={this.searchWithParams}
            onSeeAll={onSeeAll}
          />
        </Item>
        <Item name={text.trim}>
          <OptionBtn
            selected={trim}
            values={trimArray}
            origin="trim"
            onChange={this.searchWithParams}
            onSeeAll={onSeeAll}
          />
        </Item>
        <ExpandableDiv style={{ overflow: 'hidden', minHeight: '72px' }} pose={yearTogle ? 'expanded' : 'retracted'} className="border-bottom">
          <div
            className="d-flex mb-0 p-3 justify-content-between"
            onClick={() => { this.setState({ yearTogle: !yearTogle }); }}
          >
            <div
              className="mb-0"
              style={{
                display: 'flex',
                fontSize: '16px',
                alignContent: 'center',
                alignItems: 'center',
                fontWeight: '600',
              }}
            >
              <span>{text.year}</span>
            </div>
            <ArrowWrapper toggle={yearTogle} style={{ color: 'rgb(58, 62, 67)' }}><ArrowIcon /></ArrowWrapper>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <RangeSelector
              items={yearArray}
              selectedYears={year}
              onBoundChanged={this.onBoundChanged}
            />
          </div>
        </ExpandableDiv>
        <Item name={text.color}>
          <OptionBtn
            selected={color}
            values={colorArray}
            origin="color"
            onChange={this.searchWithParams}
            onSeeAll={onSeeAll}
          />
        </Item>
        <Item name={text.engine}>
          <OptionBtn
            selected={engine}
            values={engineArray}
            origin="engine"
            onChange={this.searchWithParams}
            onSeeAll={onSeeAll}
          />
        </Item>
      </FilterPanelWrapper>
    );
  }
}

FilterPanel.defaultProps = {
  getCars: () => { },
  availableArguments: {},
  params: {},
};

export default injectIntl(FilterPanel);
