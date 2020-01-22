import React from 'react';
import './styles.css';
import axios from 'axios';
import UnderLine from '../../../Underline/Underline';
import { ApiServer } from '../../../../Defaults';
import styled from 'styled-components';

const HeadingStyle = styled.div`
  font-size: 1em;
  font-weight: 600;
  line-height: 1.31;
  padding: 20px 40px;
  color: #000000;
  @media only screen and (max-width: 768px) {
    padding: 20px 10px;
  }
`;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class TransactionsSide extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token'),
      manualHistory: [],
      history: [],
    };

    this.getHistory = this.getHistory.bind(this);
    this.getManualHistory = this.getManualHistory.bind(this);
  }

  componentDidMount() {
    this.getHistory();
    this.getManualHistory();
  }

  async getManualHistory() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    const historyElements = [];
    const response = (await axios.get(`${ApiServer}/api/v1/user/funds/manual-history`, config)).data;

    for (let i = 0; i < response.length; i += 1) {
      const dateTime = new Date(response[i].created_at);
      historyElements.push(
        <tr>
          <td>
            {dateTime.toDateString()}
            {' '}
            {dateTime.toLocaleTimeString()}
          </td>
          <td>Funds payments</td>
          <td style={{ textAlign: 'left' }}>
              $
            {' '}
            {numberWithCommas(parseFloat(response[i].amount).toFixed(2))}
          </td>
          <td>Succeeded</td>
          <td>{response[i].source_id}</td>
          <td>
            <i
              style={{
                color: 'rgb(59, 68, 75)',
                fontSize: '16px',
                margin: '5px',
                cursor: 'pointer',
              }}
              className="fas fa-file-invoice-dollar"
            />
            <i
              style={{
                color: 'rgb(59, 68, 75)',
                fontSize: '16px',
                margin: '5px',
                cursor: 'pointer',
              }}
              className="fas fa-receipt"
            />

          </td>
        </tr>,
      );
    }
    this.setState({
      manualHistory: historyElements,
    });
  }

  async getHistory() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    const historyElements = [];
    const response = (await axios.get(`${ApiServer}/api/v1/user/funds/history`, config)).data;

    for (let i = 0; i < response.length; i += 1) {
      const dateTime = new Date(response[i].created_at);
      historyElements.push(
        <tr>
          <td>
            {dateTime.toDateString()}
            {' '}
            {dateTime.toLocaleTimeString()}
          </td>
          <td>Funds payments</td>
          <td style={{ textAlign: 'left' }}>
            $
            {' '}
            {numberWithCommas(parseFloat(response[i].amount).toFixed(2))}
          </td>
          <td>Succeeded</td>
          <td>{response[i].source_id}</td>
          <td>
            <i
              style={{
                color: 'rgb(59, 68, 75)',
                fontSize: '16px',
                margin: '5px',
                cursor: 'pointer',
              }}
              className="fas fa-file-invoice-dollar"
            />
            <i
              style={{
                color: 'rgb(59, 68, 75)',
                fontSize: '16px',
                margin: '5px',
                cursor: 'pointer',
              }}
              className="fas fa-receipt"
            />

          </td>
        </tr>,
      );
    }

    this.setState({
      history: historyElements,
    });
  }

  render() {
    const { history, manualHistory } = this.state;

    return (
      <HeadingStyle>
        <div className="card shadow content-holder-box">
          <UnderLine>
            <h4 className="mb-0">Transactions history</h4>
          </UnderLine>
          <div style={{ flexDirection: 'column' }} className="d-flex content-main">
            <button
              type="button"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                width: '200px',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer',
                fontSize: '12px',
                float: 'right',
              }}
              onClick={this.onOpenModal}
            >
              <i style={{ fontSize: '12px', color: '#000000' }} className="fas fa-file-download" />
              {' '}
          [PDF] View Report
            </button>

            <div style={{
              width: '100%', display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', overflowX: 'auto'
            }}
            >
              <table style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '#DEDEDE 1px solid', borderTop: '#DEDEDE 1px solid' }}>
                    <th style={{ padding: '10px' }}>Date</th>
                    <th style={{ padding: '10px' }}>Concept</th>
                    <th style={{ padding: '10px' }}>Amount</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px' }}>Source</th>
                    <th style={{ padding: '10px' }}>Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {history}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card shadow content-holder-box">
          <UnderLine>
            <h4 className="mb-0">Manual Transactions history</h4>
          </UnderLine>
          <div style={{ flexDirection: 'column' }} className="d-flex content-main">
            <div style={{
              width: '100%', display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center',
              overflowX: 'auto'
            }}
            >
              <table style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '#DEDEDE 1px solid', borderTop: '#DEDEDE 1px solid' }}>
                    <th style={{ padding: '10px' }}>Date</th>
                    <th style={{ padding: '10px' }}>Concept</th>
                    <th style={{ padding: '10px' }}>Amount</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px' }}>Representative ID</th>
                    <th style={{ padding: '10px' }}>Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {manualHistory}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </HeadingStyle>
    );
  }
}

export default TransactionsSide;
