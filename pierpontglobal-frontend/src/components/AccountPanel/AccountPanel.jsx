import React from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Tab from './Tab/Tab';
import DealerTab from './DealerTab/DealerTab';
import FundTab from './FundTab/FundTab';
import Container from '../styles/Container/Container';
import { ApiServer } from '../../Defaults';

class AccountPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      funds: 0,
    };

    this.signOut = this.signOut.bind(this);
    this.getFunds = this.getFunds.bind(this);
    this.markSelected = this.markSelected.bind(this);

    // Labels
    this.lbPurchases = this.props.intl.formatMessage({ id: 'menu.purchases' });
    this.lbDocuments = this.props.intl.formatMessage({ id: 'menu.documents' });
    this.lbSettings = this.props.intl.formatMessage({ id: 'menu.settings' });
    this.lbFinancialAnalysis = this.props.intl.formatMessage({ id: 'menu.financial' });
    this.lbPending = this.props.intl.formatMessage({ id: 'menu.pending' });
    this.lbSubscription = this.props.intl.formatMessage({ id: 'menu.subscription' });
    this.lbTransactions = this.props.intl.formatMessage({ id: 'menu.transaction' });
  }

  componentDidMount() {
    this.getFunds();
  }

  async getFunds() {
    const responseFunds = (await axios.get(`${ApiServer}/api/v1/user/funds`)).data;
    this.setState({
      funds: responseFunds.balance,
    });
  }

  markSelected(selected) {
    this.setState({ selected });
  }

  async signOut() {
    await axios.post(`${ApiServer}/api/v1/user/invalidate`, {
      one_signal_uuid: this.props.cookies.get('one_signal_uuid'),
    });
    this.props.cookies.remove('token', { path: '/' });
    this.navigateTo('/');
  }

  navigateTo = (path) => {
    this.props.history.push(path);
  }

  render() {
    const { selected } = this.state;
    const { dealer, inner } = this.props;
    return (
      <Container
        className="d-flex flex-column justify-content-between h-100"
        backgroundColor="#fafafa"
        style={{
          overflow: 'auto',
        }}
        boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
      >
        <div>
          <DealerTab openNotification={this.props.openNotification} dealer={dealer} />
          {inner
            ? (
              <div>
                {inner}
                <hr />
              </div>
            )
            : ''
          }

          <Tab
            searchKey="purchase"
            name={this.lbPurchases}
            icon="fas fa-shopping-cart"
            path="/user/purchase"
          />
          <Tab
            searchKey="pending"
            name={this.lbPending}
            icon="fas fa-sync-alt"
            notification={0}
            path="/user/pending"
          />
          <Tab
            name={this.lbDocuments}
            icon="fas fa-file"
          />
          <Tab
            searchKey="financial"
            name={this.lbFinancialAnalysis}
            icon="fas fa-dollar-sign"
            path="/user/financial"
          />
          <Tab
            searchKey="subscription"
            name={this.lbSubscription}
            icon="far fa-newspaper"
            path="/user/subscription"
          />
          <Tab
            searchKey="transactions"
            name={this.lbTransactions}
            icon="fas fa-file-invoice-dollar"
            path="/user/transactions"
          />
          <Tab
            name={<FormattedMessage id="label.sign-out" />}
            icon="fas fa-sign-out-alt"
            onClick={this.signOut}
          />
        </div>
        <div>
          <FundTab funds={{ remaining: this.state.funds, total: '10 000' }} />
          <Tab
            searchKey="user"
            name={this.lbSettings}
            icon="fas fa-cog"
            selected={selected}
            className="border-top pt-2"
            onClick={() => this.navigateTo('/user') }
          />
        </div>
      </Container>
    );
  }
}

AccountPanel.defaultProps = {
  cookies: {},
  dealer: {},
};

export default withCookies(injectIntl(withRouter(AccountPanel)));
