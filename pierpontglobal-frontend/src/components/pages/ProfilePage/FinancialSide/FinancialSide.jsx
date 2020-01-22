import React from 'react';
import './styles.css';
import StatHolder from './Components/StatHolder/StatHolder';

class FinancialSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-financial">
        <div className="financial-holder">
          <StatHolder value={21} title="AVERAGE DAYS ON MARKET" logo={<i className="fas fa-calendar" />} />
          <StatHolder value="$81 853" title="INVESTMENT" logo={<i className="fas fa-calculator" />} />
          <StatHolder value="$118 238" title="TOTAL SALES" logo={<i className="fas fa-dollar-sign" />} />
          <StatHolder className="accent" title="GROSS PROFIT" value="$36 385" logo={<i className="fas fa-chart-pie" />} />
          <StatHolder className="accent" title="GROSS PROFIT MARGIN" logo={<i className="fas fa-percent" />} value="%44.45" />
          <StatHolder className="accent" title="AVERAGE PROFIT" logo={<i className="fas fa-dollar-sign" />} value="$809" />
        </div>

        <button
          type="button"
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            fontSize: '12px',
            margin: '30px',
            float: 'right',
          }}
          onClick={this.onOpenModal}
        >
          <i style={{ fontSize: '12px', color: '#000000' }} className="fas fa-file-download" />
          {' '}
          [PDF] View Yearly Report
        </button>

        <div style={{
          width: '100%', display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center',
        }}
        >
          <table style={{ width: '90%' }}>
            <thead>
              <tr style={{ borderBottom: '#DEDEDE 1px solid', borderTop: '#DEDEDE 1px solid' }}>
                <th style={{ padding: '10px' }}>Date</th>
                <th style={{ padding: '10px' }}>Model</th>
                <th style={{ padding: '10px' }}>Basic Price</th>
                <th style={{ padding: '10px' }}>Winner Bid</th>
                <th style={{ padding: '10px' }}>???</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

export default FinancialSide;
