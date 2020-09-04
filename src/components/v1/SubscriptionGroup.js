import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import AddressShippingBlock from './AddressShippingBlock';
import OrderDiscountBlock from './OrderDiscountBlock';
import OrderProductsBlock from './OrderProductsBlock';
import PaymentInformationBlock from './PaymentInformationBlock';
import SubscriptionGroupHeader from './SubscriptionGroupHeader';
import TransactionHistoryBlock from './TransactionHistoryBlock';
import Translation from '../Translation';
import UpcomingOrdersBlock from './UpcomingOrdersBlock';
import OrderCancellationBlock from './OrderCancellationBlock';
import { ORDER_PROP_TYPE } from '../../constants/PropTypes';
import SubscriptionGroupAuthCreditCard from './SubscriptionGroupAuthCreditCard';

class SubscriptionGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentAltered: false,
    };

    this.toggleDetails = this.toggleDetails.bind(this);
  }

  componentDidMount() {
    this.oneSub();
  }

  oneSub() {
    if (this.props.orderCount === 1) {
      this.setState({ contentAltered: !this.state.contentAltered });
    }
  }

  toggleDetails() {
    this.setState({ contentAltered: !this.state.contentAltered });
  }

  render() {
    const { order, hasDeletedProducts } = this.props;

    return (
      <div className="subscription-container">
        <UpcomingOrdersBlock orderId={order.id} disabled={order.status !== 0} />

      </div>
    );
  }
}

SubscriptionGroup.propTypes = {
  order: ORDER_PROP_TYPE.isRequired,
  hasDeletedProducts: PropTypes.bool.isRequired,
  orderCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  order: state.data.orders.find(order => order.id === ownProps.orderId),
  hasDeletedProducts: state.data.orders.find(o => o.id === ownProps.orderId)
    .order_products.filter(prod => prod.status === 1).length > 0,
  orderCount: state.data.orders.length,
});

export default connect(mapStateToProps)(SubscriptionGroup);
