'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const WalletContext = /*#__PURE__*/React__default['default'].createContext();
const WalletProvider = ({
  api,
  children
}) => /*#__PURE__*/React__default['default'].createElement(WalletContext.Provider, {
  value: api
}, children);
const useWalletContext = () => React__default['default'].useContext(WalletContext);

const {
  I18n
} = globalThis.sdk;

const formatCrypto = ({
  locale = "en",
  value,
  showTicker = true,
  ...parameters
}) => {
  const ticker = parameters.ticker || "ARK";
  const numeral = I18n.Numeral.make(locale, {
    currencyDisplay: "name",
    maximumFractionDigits: 8,
    minimumFractionDigits: 2
  });
  let formatted = numeral.formatAsCurrency(value, "BTC").replace("BTC", ticker.toUpperCase());

  if (!showTicker) {
    formatted = formatted.split(" ").slice(0, -1).join(" ");
  }

  return formatted;
};

const upperFirst = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const DelegateDetailsListItem = ({
  label,
  value
}) => /*#__PURE__*/React__default['default'].createElement("div", {
  className: "border-b border-dashed border-theme-secondary-300 dark:border-theme-secondary-800 space-x-4 py-4 last:border-0"
}, /*#__PURE__*/React__default['default'].createElement("div", {
  className: "flex justify-between"
}, /*#__PURE__*/React__default['default'].createElement("span", {
  className: "font-semibold text-theme-secondary-700 dark:text-theme-secondary-200"
}, label), /*#__PURE__*/React__default['default'].createElement("span", {
  className: "font-semibold text-theme-secondary-500 dark:text-theme-secondary-700"
}, value)));

const DelegateDetailsList = ({
  title,
  items
}) => /*#__PURE__*/React__default['default'].createElement("div", null, title && /*#__PURE__*/React__default['default'].createElement("h3", {
  className: "mt-4 mb-0"
}, title), items.map((item, index) => /*#__PURE__*/React__default['default'].createElement(DelegateDetailsListItem, _extends({
  key: index
}, item))));

const TypeBadge = ({
  isPrivate
}) => {
  if (isPrivate) {
    return /*#__PURE__*/React__default['default'].createElement("span", {
      className: "ml-2 bg-theme-danger-400 text-white text-xs text-center font-semibold rounded py-1 px-2"
    }, "Private");
  }

  return /*#__PURE__*/React__default['default'].createElement("span", {
    className: "ml-2 bg-theme-success-600 text-white text-xs text-center font-semibold rounded py-1 px-2"
  }, "Public");
};

const ClaimStatusBadge = ({
  isClaimed
}) => {
  if (isClaimed) {
    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null);
  }

  return /*#__PURE__*/React__default['default'].createElement("span", {
    className: "ml-2 bg-theme-danger-400 text-white text-xs text-center font-semibold rounded py-1 px-2"
  }, "Unclaimed");
};

const DelegateDetailsTitle = ({
  delegate
}) => /*#__PURE__*/React__default['default'].createElement("div", {
  className: "flex items-center"
}, /*#__PURE__*/React__default['default'].createElement("span", null, delegate.name), /*#__PURE__*/React__default['default'].createElement(TypeBadge, {
  isPrivate: delegate.isPrivate
}), /*#__PURE__*/React__default['default'].createElement(ClaimStatusBadge, {
  isClaimed: delegate.isClaimed
}));

const {
  Components: Components$4
} = globalThis.payvo;
const {
  Alert,
  Link: Link$1,
  Modal: Modal$1
} = Components$4;

const DelegateDetails = ({
  isOpen,
  delegate,
  onClose
}) => {
  if (!delegate) {
    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null);
  }

  const generalItems = [{
    label: "Rank",
    value: delegate.rank
  }, {
    label: "Votes",
    value: /*#__PURE__*/React__default['default'].createElement("span", null, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "text-sm"
    }, delegate.voterCount, " Voters /"), " ", formatCrypto({
      value: delegate.votes / 1e8
    }))
  }];

  if (delegate.website) {
    generalItems.push({
      label: "Website",
      value: /*#__PURE__*/React__default['default'].createElement(Link$1, {
        to: delegate.website,
        isExternal: true
      }, delegate.website)
    });
  }

  const payoutItems = [{
    label: "Shared Percentage",
    value: `${delegate.payout.percentage}%`
  }, {
    label: "Interval",
    value: `${delegate.payout.interval}h`
  }];

  if (delegate.payout.minimum) {
    payoutItems.push({
      label: "Minimum Payout",
      value: formatCrypto({
        value: delegate.payout.minimum / 1e8
      })
    });
  }

  if (delegate.payout.maximum) {
    payoutItems.push({
      label: "Maximum Payout",
      value: formatCrypto({
        value: delegate.payout.minimum / 1e8
      })
    });
  }

  if (delegate.payout.minVotes) {
    payoutItems.push({
      label: "Minimum Required Vote-Weight",
      value: formatCrypto({
        value: delegate.payout.minVotes / 1e8
      })
    });
  }

  if (delegate.payout.maxVotes) {
    payoutItems.push({
      label: "Maximum Regarded Vote-Weight",
      value: formatCrypto({
        value: delegate.payout.maxVotes / 1e8
      })
    });
  }

  const contributionItems = [{
    label: "Count",
    value: delegate.contributions.count
  }, {
    label: "Days Since Last",
    value: delegate.contributions.last || "0"
  }, {
    label: "Status",
    value: `${upperFirst(delegate.contributions.status)}`
  }];
  return /*#__PURE__*/React__default['default'].createElement(Modal$1, {
    isOpen: isOpen,
    title: /*#__PURE__*/React__default['default'].createElement(DelegateDetailsTitle, {
      delegate: delegate
    }),
    onClose: onClose
  }, /*#__PURE__*/React__default['default'].createElement(DelegateDetailsList, {
    items: generalItems
  }), /*#__PURE__*/React__default['default'].createElement(DelegateDetailsList, {
    title: "Payout",
    items: payoutItems
  }), delegate.contributions.count > 0 && /*#__PURE__*/React__default['default'].createElement(DelegateDetailsList, {
    title: "Contributions",
    items: contributionItems
  }), /*#__PURE__*/React__default['default'].createElement(Alert, {
    className: "mt-4",
    variant: "hint"
  }, "Visit", " ", /*#__PURE__*/React__default['default'].createElement(Link$1, {
    to: `https://arkdelegates.live/delegate/${delegate.slug}`,
    isExternal: true
  }, "arkdelegates.live/delegate/", delegate.slug), " ", "for more information about this delegate"));
};

const {
  Components: Components$3
} = globalThis.payvo;
const {
  Spinner,
  Table,
  TableCell,
  TableRow,
  Tooltip
} = Components$3;

const DelegateListItem = ({
  delegate,
  onSelect
}) => {
  const renderStatus = () => {
    const {
      isClaimed,
      isPrivate
    } = delegate;

    if (isClaimed) {
      return /*#__PURE__*/React__default['default'].createElement(Tooltip, {
        content: isPrivate ? "You may not receive any rewards from this delegate" : undefined,
        placement: "right",
        size: "sm"
      }, /*#__PURE__*/React__default['default'].createElement("span", null, isPrivate ? "Private" : "Public"));
    }

    return /*#__PURE__*/React__default['default'].createElement(Tooltip, {
      content: "The delegate has not claimed their account and the information shown is likely to be inaccurate",
      placement: "right",
      size: "sm"
    }, /*#__PURE__*/React__default['default'].createElement("span", null, "Unclaimed"));
  };

  const renderContributionStatus = () => {
    const {
      count,
      last,
      status
    } = delegate.contributions;

    const tooltipContent = () => {
      if (last === 0) {
        return "The last contribution was published today";
      }

      if (last === 1) {
        return `The last contribution was published ${last} day ago`;
      }

      return `The last contribution was published ${last} days ago`;
    };

    if (count && status !== "inactive") {
      return /*#__PURE__*/React__default['default'].createElement("span", {
        className: "ml-2 pl-2 border-l border-theme-secondary-300 dark:border-theme-secondary-800"
      }, /*#__PURE__*/React__default['default'].createElement(Tooltip, {
        content: tooltipContent(),
        placement: "right",
        size: "sm"
      }, /*#__PURE__*/React__default['default'].createElement("span", null, `${upperFirst(status)} Contributor`)));
    }

    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null);
  };

  return /*#__PURE__*/React__default['default'].createElement(TableRow, null, /*#__PURE__*/React__default['default'].createElement(TableCell, {
    variant: "start"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: "font-semibold text-theme-primary-600 hover:text-theme-primary-700 cursor-pointer",
    onClick: () => onSelect(delegate)
  }, delegate.name), delegate.isVoted && /*#__PURE__*/React__default['default'].createElement("span", {
    className: "ml-2 bg-theme-danger-400 text-white text-xs text-center font-semibold rounded py-1 px-2"
  }, "Voted")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex font-semibold text-xs text-theme-secondary-text"
  }, renderStatus(), " ", renderContributionStatus()))), /*#__PURE__*/React__default['default'].createElement(TableCell, {
    innerClassName: "justify-end"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col items-end"
  }, /*#__PURE__*/React__default['default'].createElement("span", null, delegate.rewards ? formatCrypto({
    showTicker: false,
    value: delegate.rewards
  }) : "None"), delegate.rewardsDiff !== undefined && /*#__PURE__*/React__default['default'].createElement("span", {
    className: `font-semibold text-xs ${delegate.rewardsDiff > 0 ? "text-theme-success-600" : "text-theme-danger-400"}`
  }, delegate.rewardsDiff > 0 && /*#__PURE__*/React__default['default'].createElement("span", null, "+"), formatCrypto({
    showTicker: false,
    value: delegate.rewardsDiff
  })))), /*#__PURE__*/React__default['default'].createElement(TableCell, {
    innerClassName: "justify-end"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col items-end"
  }, /*#__PURE__*/React__default['default'].createElement("span", null, delegate.rewards ? formatCrypto({
    showTicker: false,
    value: delegate.rewards * 7
  }) : "None"), delegate.rewardsDiff !== undefined && /*#__PURE__*/React__default['default'].createElement("span", {
    className: `font-semibold text-xs ${delegate.rewardsDiff > 0 ? "text-theme-success-600" : "text-theme-danger-400"}`
  }, delegate.rewardsDiff > 0 && /*#__PURE__*/React__default['default'].createElement("span", null, "+"), formatCrypto({
    showTicker: false,
    value: delegate.rewardsDiff * 7
  })))), /*#__PURE__*/React__default['default'].createElement(TableCell, {
    innerClassName: "justify-end"
  }, /*#__PURE__*/React__default['default'].createElement("span", null, delegate.payout.percentage, "%")), /*#__PURE__*/React__default['default'].createElement(TableCell, {
    variant: "end",
    innerClassName: "justify-end"
  }, /*#__PURE__*/React__default['default'].createElement("span", null, delegate.payout.interval, "h")));
};

const DelegateTable = ({
  isLoading,
  delegateData = [],
  onSelectDelegate
}) => {
  const columns = [{
    Header: "Name",
    accessor: "name"
  }, {
    Header: "Daily Rewards",
    accessor: "rewards",
    className: "justify-end"
  }, {
    Header: "Weekly Rewards",
    accessor: delegate => delegate.rewards,
    className: "justify-end"
  }, {
    Header: "Payout",
    accessor: delegate => delegate.payout.percentage,
    className: "justify-end"
  }, {
    Header: "Interval",
    accessor: delegate => delegate.payout.interval,
    className: "justify-end"
  }];

  if (isLoading) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: "flex flex-1 justify-center items-center"
    }, /*#__PURE__*/React__default['default'].createElement(Spinner, null));
  }

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React__default['default'].createElement(Table, {
    columns: columns,
    data: delegateData
  }, delegate => /*#__PURE__*/React__default['default'].createElement(DelegateListItem, {
    delegate: delegate,
    onSelect: onSelectDelegate
  })));
};

const Avatar = ({
  imageData
}) => /*#__PURE__*/React__default['default'].createElement("div", {
  className: "h-11 w-11 flex-shrink-0 overflow-hidden rounded-full"
}, /*#__PURE__*/React__default['default'].createElement("img", {
  src: `data:image/svg+xml;utf8,${imageData}`
}));

const {
  Components: Components$2
} = globalThis.payvo;
const {
  Card
} = Components$2;
const Header = ({
  selectedWallet,
  onClickAddress
}) => {
  const balance = selectedWallet.data.BALANCE.available;
  const ticker = selectedWallet.data.COIN;
  return /*#__PURE__*/React__default['default'].createElement(Card, {
    onClick: onClickAddress
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center w-1/2 space-x-4 pr-6"
  }, /*#__PURE__*/React__default['default'].createElement(Avatar, {
    imageData: selectedWallet.settings.AVATAR
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col flex-1 overflow-hidden"
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: "font-semibold text-theme-secondary-text text-sm"
  }, "Address"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center space-x-2 whitespace-nowrap no-ligatures cursor-pointer"
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: "font-semibold text-base text-theme-text"
  }, selectedWallet.settings.ALIAS), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "truncate text-theme-secondary-500 dark:text-theme-secondary-700 font-semibold"
  }, selectedWallet.data.ADDRESS)))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col w-1/2 pl-6 border-l border-theme-secondary-300 dark:border-theme-secondary-800"
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: "font-semibold text-theme-secondary-text text-sm"
  }, "Balance"), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "font-bold text-theme-text"
  }, formatCrypto({
    ticker,
    value: Number(balance / 1e8)
  })))));
};

const {
  Components: Components$1
} = globalThis.payvo;
const {
  Modal
} = Components$1;

const WalletSelectionItem = ({
  wallet,
  onSelect
}) => {
  const address = wallet.data.ADDRESS;
  const {
    ALIAS: alias,
    AVATAR: avatar
  } = wallet.settings;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center cursor-pointer border-b border-dashed border-theme-secondary-300 dark:border-theme-secondary-800 space-x-4 py-4 last:border-0",
    onClick: () => onSelect(address)
  }, /*#__PURE__*/React__default['default'].createElement(Avatar, {
    imageData: avatar
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col flex-1 overflow-hidden whitespace-nowrap no-ligatures"
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: "font-semibold text-theme-secondary-text text-sm"
  }, alias), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "truncate text-theme-secondary-500 dark:text-theme-secondary-700 font-semibold"
  }, address)));
};

const WalletSelection = ({
  isOpen,
  wallets,
  onSelectWallet,
  onClose
}) => /*#__PURE__*/React__default['default'].createElement(Modal, {
  isOpen: isOpen,
  title: "Select Wallet",
  onClose: onClose
}, wallets.map(wallet => /*#__PURE__*/React__default['default'].createElement(WalletSelectionItem, {
  key: wallet.data.ADDRESS,
  wallet: wallet,
  onSelect: onSelectWallet
})));

const useDelegateData = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [delegateData, setDelegateData] = React.useState([]);
  const context = useWalletContext();
  const client = context.http().create();
  React.useEffect(() => {
    const fetchDelegateData = async () => {
      setIsLoading(true);
      let delegates = [];

      try {
        const response = await client.get("https://arkdelegates.live/api/delegates", {
          limit: 51
        });
        delegates = response.json().data.map(delegate => ({
          contributions: {
            count: delegate.contributionsCount,
            last: delegate.days_since_last_contribution,
            status: delegate.contribution_status
          },
          isClaimed: delegate.is_claimed,
          isPrivate: delegate.is_private,
          name: delegate.name,
          payout: {
            interval: delegate.payout_interval,
            maxVotes: delegate.payout_maximum_vote_amount && delegate.payout_maximum_vote_amount !== "0" ? Number(delegate.payout_maximum_vote_amount) : null,
            maximum: delegate.payout_maximum && delegate.payout_maximum !== "0" ? Number(delegate.payout_maximum) : null,
            minVotes: delegate.payout_minimum_vote_amount && delegate.payout_minimum_vote_amount !== "0" ? Number(delegate.payout_minimum_vote_amount) : null,
            minimum: delegate.payout_minimum && delegate.payout_minimum !== "0" ? Number(delegate.payout_minimum) : null,
            percentage: delegate.payout_percent
          },
          publicKey: delegate.public_key,
          rank: delegate.rank,
          slug: delegate.slug,
          voterCount: delegate.delegateStatistics.payload.voters_not_zero_balance,
          votes: Number(delegate.delegateStatistics.voting_power),
          website: delegate.website
        }));
      } catch {//
      }

      setIsLoading(false);
      setDelegateData(delegates);
    };

    fetchDelegateData();
  }, []);
  const calculateRewards = React.useCallback(selectedWallet => {
    let mapped = delegateData.map(delegate => {
      const newDelegate = { ...delegate,
        isVoted: false
      };
      const balance = Number(selectedWallet.data.BALANCE.available);

      if (selectedWallet.data.VOTES.length > 0 && newDelegate.publicKey === selectedWallet.data.VOTES[0].id) {
        newDelegate.isVoted = true;
      }

      if (!newDelegate.isVoted) {
        newDelegate.votes = newDelegate.votes + balance;
      }

      newDelegate.rewards = balance / newDelegate.votes * 422 * newDelegate.payout.percentage / 100;
      return newDelegate;
    });
    const votedDelegate = mapped.find(delegate => delegate.isVoted);

    if (votedDelegate) {
      mapped = mapped.map(delegate => {
        delegate.rewardsDiff = delegate.publicKey === selectedWallet.data.VOTES[0].id ? undefined : delegate.rewards - votedDelegate.rewards;
        return delegate;
      });
    }

    return mapped;
  }, [delegateData]);
  return {
    calculateRewards,
    isLoading
  };
};

const CoinsIcon = () => /*#__PURE__*/React__default['default'].createElement("svg", {
  version: "1.1",
  id: "coins",
  xmlns: "http://www.w3.org/2000/svg",
  x: "0",
  y: "0",
  viewBox: "0 0 500 500"
}, /*#__PURE__*/React__default['default'].createElement("g", {
  fill: "currentColor"
}, /*#__PURE__*/React__default['default'].createElement("path", {
  d: "M0 46.767c1-4.252 1.609-8.645 3.07-12.732C9.341 16.488 21.676 6.173 40.338 3.955c4.995-.594 10.063-.803 15.098-.806 74.823-.049 149.646-.06 224.469.001 8.845.008 17.5 1.173 25.5 5.522 21.455 11.664 29.673 37.479 18.758 59.265-.713 1.423-1.383 2.868-2.452 5.091 2.623.208 4.612.5 6.602.502 22.658.033 45.317-.039 67.976.048 12.407.048 23.77 3.146 33.358 11.612 12.864 11.36 17.892 29.846 12.442 46.817-5.261 16.382-20.081 28.572-36.913 29.92-7.94.637-15.932.624-23.901.877-1.917.06-3.838.009-6.236.009.978 5.735 3.42 8.896 8.609 10.542 41.802 13.263 73.572 39.153 95.337 77.117 12.587 21.957 19.47 45.713 20.762 71.093 2.45 48.141-12.865 89.8-46.008 124.611-26.29 27.616-58.645 44.373-96.52 49.17-53.373 6.759-99.776-8.659-138.61-46.06-3.572-3.44-7.134-4.852-12.073-4.826-34.884.185-69.77.152-104.654.066-11.658-.03-22.559-2.596-31.896-10.222-20.158-16.464-22.22-46.317-4.065-64.96 3.502-3.597 3.749-5.469.085-9.2-16.97-17.285-16.818-44.25.255-61.606 3.27-3.323 3.419-5.07.062-8.475-17.269-17.518-17.284-44.455-.052-61.97 3.282-3.336 3.38-5.08.05-8.482-11.929-12.18-15.62-26.902-10.912-43.214 4.843-16.778 16.363-27.46 33.322-30.934 8.814-1.806 18.15-1.084 27.251-1.462 2.204-.091 4.415-.013 7.881-.013-10.08-17.457-10.246-34.078-.138-51.24-3.105-.161-5.133-.356-7.16-.358-22.66-.023-45.319.079-67.977-.057-11.308-.068-21.984-2.503-31.018-9.907C8.204 74.751 2.49 65.074 1.16 52.921c-.156-1.424-.762-2.8-1.16-4.197v-1.957zm481.679 284.59c-.028-81.31-65.843-147.042-147.197-147.014-81.298.028-147.043 65.856-147.014 147.2.03 81.304 65.85 147.04 147.2 147.01 81.313-.029 147.04-65.84 147.011-147.197zM164.846 73.543c39.77 0 79.538.031 119.307-.018 11.856-.015 21.575-6.91 25.061-17.497 5.55-16.849-6.52-33.972-24.338-34.031-42.54-.143-85.08-.057-127.619-.058-37.324-.001-74.648-.03-111.972.03-11.565.019-21.203 6.867-24.74 17.259-5.78 16.977 6.394 34.215 24.506 34.272 39.931.125 79.863.039 119.795.043zm115.399 70.442c39.442 0 78.885-.04 118.328.04 6.247.013 11.948-1.295 16.972-5.084 9.015-6.8 12.605-18.074 9.192-28.784-3.337-10.472-13.056-17.715-24.384-17.739-38.79-.08-77.582-.042-116.373-.043-41.072 0-82.145-.027-123.218.03-11.584.015-21.215 6.836-24.768 17.222-5.805 16.967 6.36 34.25 24.455 34.308 39.931.128 79.864.04 119.796.05zm66.222 21.973l.194-1.663c-3.033-.49-6.063-1.378-9.1-1.404-17.115-.141-34.232-.08-51.348-.08-62.106 0-124.213.03-186.32-.042-6.222-.007-11.979 1.083-17.082 4.772-9.262 6.697-13.058 18.21-9.606 29.077 3.328 10.48 13.045 17.736 24.37 17.761 37.002.084 74.006-.084 111.008.168 6.133.041 10.67-1.58 15.187-5.829 15.375-14.458 33.232-25.074 53.026-32.423 21.185-7.864 43.022-11.432 65.624-10.094 1.34.08 2.697-.155 4.047-.243zm-146.862 67.845c-.802-.196-1.417-.477-2.031-.477-34.212-.007-68.427-.285-102.632.174-12.91.174-22.994 12.444-22.896 25.905.097 13.295 10.616 25.103 23.597 25.288 25.41.363 50.828.179 76.241.024 1.507-.01 3.93-1.451 4.363-2.748 5.557-16.657 13.474-32.101 23.203-46.665.155-.232.074-.622.155-1.501zm-2.471 191.54c-.452-1.359-.557-2.185-.963-2.819-9.026-14.081-15.979-29.097-20.954-45.082-.46-1.479-3.269-3.156-5-3.17-24.616-.195-49.235-.18-73.852-.072-6.867.03-12.687 2.959-17.283 7.964-7.438 8.102-9.248 17.6-5.058 27.662 4.186 10.056 12.13 15.762 23.18 15.824 31.954.179 63.91.074 95.864.062 1.115 0 2.23-.197 4.066-.37zm-26.467-120.99c-1.266-.305-1.88-.582-2.493-.582-24.437-.01-48.883-.377-73.308.173-13.095.296-23.085 12.688-22.812 26.465.256 12.967 10.863 24.54 23.668 24.731 23.455.35 46.919.098 70.38.167 3.156.01 4.182-1.1 4.035-4.373-.44-9.732-.688-19.48-.648-29.222.023-5.66.744-11.316 1.178-17.358z"
}), /*#__PURE__*/React__default['default'].createElement("path", {
  d: "M312.688 302.645c.108 9.015 7.235 16.658 17.248 18.353 5.601.949 11.38 1.19 16.818 2.697 16.756 4.643 27.642 18.548 28.152 35.21.457 14.91-9.672 29.239-25.18 34.955-3.774 1.39-5.776 3.011-6.298 7.292-.702 5.758-4.135 8.353-9.118 8.256-4.853-.094-8.216-2.904-8.8-8.68-.4-3.967-2.241-5.35-5.641-6.658-14.53-5.589-23.628-15.754-25.48-31.662-.75-6.435 2.05-11.14 7.207-11.97 5.609-.902 9.667 2.501 10.945 9.18 2.922 15.26 17.556 22.916 31.836 16.656 7.933-3.478 12.52-10.492 12.018-18.378-.481-7.554-6.575-14.701-14.984-16.721-4.875-1.171-9.997-1.265-14.956-2.136-18.253-3.207-31.615-17.5-32.267-35.905-.544-15.335 8.64-29.119 25.187-35.418 3.73-1.42 5.861-2.783 6.087-7.299.295-5.926 3.92-8.94 8.992-8.973 5.143-.032 8.672 2.782 9.114 8.827.34 4.645 2.646 6.068 6.447 7.61 14.24 5.772 23.088 16.015 24.663 31.746.64 6.388-2.317 10.891-7.618 11.753-4.996.812-10.191-3.018-10.337-9.274-.33-14.194-19.581-25.07-35.366-14.928-5.537 3.558-8.751 8.65-8.669 15.467zM228.937 267.232c8.727.286 12.487 6.728 9.862 13.669-2.358 6.233-5.292 12.273-7.298 18.611-15.414 48.707 6.209 102.219 51.044 126.72 1.714.936 3.481 1.792 5.123 2.844 4.857 3.11 6.401 8.081 3.999 12.575-2.372 4.438-7.48 5.99-12.644 3.475-19.12-9.309-34.866-22.664-47.291-39.92-15.621-21.692-23.478-46.095-23.745-72.646-.21-20.772 4.477-40.736 14.374-59.159 1.57-2.921 5.071-4.805 6.576-6.169zM461.363 330.965c-.432 20.326-4.926 39.656-14.03 57.874-2.943 5.887-7.789 8.21-12.556 5.973-5.112-2.398-6.321-7.36-4.13-13.787 3.819-11.195 8.644-22.288 10.589-33.837 7.353-43.658-14.988-88.468-53.811-110.056-1.85-1.028-3.758-1.96-5.559-3.069-5.21-3.208-6.878-8.247-4.324-12.83 2.444-4.383 7.443-5.881 12.707-3.375 13.371 6.366 25.207 14.962 35.375 25.707 21.138 22.34 33.187 48.753 35.067 79.615.158 2.599.445 5.19.672 7.785zM358.726 214.182c-.054 4.997-3.966 8.878-9.042 8.97-5.14.093-9.456-4.15-9.381-9.22.072-4.896 4.153-8.895 9.141-8.957 5.237-.066 9.339 4.002 9.282 9.207zM319.398 439.76c4.934-.14 9.183 3.756 9.434 8.651.26 5.064-3.872 9.402-9.058 9.512-5.02.106-9.156-3.719-9.35-8.647-.205-5.23 3.694-9.364 8.974-9.515z"
})));

const {
  Components
} = globalThis.payvo;
const {
  Button,
  Link
} = Components;

const WelcomePage = ({
  hasAcceptedDisclaimer,
  onAcceptDisclaimer
}) => {
  const context = useWalletContext();

  const renderContent = () => {
    if (!hasAcceptedDisclaimer) {
      return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("span", {
        className: "my-10"
      }, "The information presented by this plugin is based on the data available on", " ", /*#__PURE__*/React__default['default'].createElement("span", {
        className: "font-semibold"
      }, "arkdelegates.live"), " and has been prepared for informational purposes only."), /*#__PURE__*/React__default['default'].createElement(Button, {
        variant: "danger",
        size: "sm",
        className: "mr-auto",
        onClick: onAcceptDisclaimer
      }, /*#__PURE__*/React__default['default'].createElement("span", null, "I Understand")));
    }

    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "my-10"
    }, "This plugin needs at least one ARK Wallet on your profile in order to work, but you have none at the moment."), /*#__PURE__*/React__default['default'].createElement("div", {
      className: "flex items-center h-11"
    }, /*#__PURE__*/React__default['default'].createElement("p", null, /*#__PURE__*/React__default['default'].createElement(Link, {
      to: `/profiles/${context.profile().id()}/wallets/import`
    }, "Import"), " or", " ", /*#__PURE__*/React__default['default'].createElement(Link, {
      to: `/profiles/${context.profile().id()}/wallets/create`
    }, "create"), " a Wallet to get started.")));
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center w-full border-t border-theme-secondary-300 dark:border-theme-secondary-800"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex mx-auto container p-10 justify-end items-center"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "w-1/2"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "transform -rotate-6 p-16 text-theme-danger-400 dark:text-theme-secondary-800"
  }, /*#__PURE__*/React__default['default'].createElement(CoinsIcon, null))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col w-1/2"
  }, /*#__PURE__*/React__default['default'].createElement("h1", null, "ARK Delegate Calculator"), renderContent(), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "mt-20 text-xs"
  }, "\xA9 ", new Date().getFullYear(), " dated / v1.1.0"))));
};

const MainPage = () => {
  const context = useWalletContext();
  const [isWalletSelectionOpen, setIsWalletSelectionOpen] = React.useState(false);
  const [isDelegateDetailsOpen, setIsDelegateDetailsOpen] = React.useState(false);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = React.useState(false);
  const [mappedDelegates, setMappedDelegates] = React.useState([]);
  const [wallets] = React.useState(() => context.profile().wallets().filter(wallet => wallet.data.COIN === "ARK" && wallet.data.NETWORK === "ark.mainnet"));
  const [selectedDelegate, setSelectedDelegate] = React.useState();
  const [selectedWallet, setSelectedWallet] = React.useState(() => {
    if (wallets.length) {
      return wallets[0];
    }
  });
  const {
    isLoading,
    calculateRewards
  } = useDelegateData();
  React.useLayoutEffect(() => {
    if (context.store().data().get("hasAcceptedDisclaimer")) {
      setHasAcceptedDisclaimer(true);
    }
  }, []);

  const handleClickAddress = () => {
    setIsWalletSelectionOpen(true);
  };

  const handleSelectWallet = address => {
    const wallet = context.profile().wallets().find(wallet => wallet.data.ADDRESS === address);
    setSelectedWallet(wallet);
    setIsWalletSelectionOpen(false);
  };

  const handleSelectDelegate = delegate => {
    setSelectedDelegate(delegate);
    setIsDelegateDetailsOpen(true);
  };

  const handleAcceptDisclaimer = () => {
    context.store().data().set("hasAcceptedDisclaimer", true);
    context.store().persist();
    setHasAcceptedDisclaimer(true);
  };

  React.useEffect(() => {
    if (selectedWallet) {
      setMappedDelegates(calculateRewards(selectedWallet));
    }
  }, [calculateRewards, selectedWallet]);
  const hasWallets = wallets.length > 0;

  if (!hasAcceptedDisclaimer || !hasWallets) {
    return /*#__PURE__*/React__default['default'].createElement(WelcomePage, {
      hasAcceptedDisclaimer: hasAcceptedDisclaimer,
      onAcceptDisclaimer: handleAcceptDisclaimer
    });
  }

  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center w-full border-t border-theme-secondary-300 dark:border-theme-secondary-800"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col mx-auto container p-10 h-full"
  }, /*#__PURE__*/React__default['default'].createElement(Header, {
    selectedWallet: selectedWallet,
    onClickAddress: handleClickAddress
  }), /*#__PURE__*/React__default['default'].createElement(DelegateTable, {
    isLoading: isLoading,
    delegateData: mappedDelegates,
    onSelectDelegate: handleSelectDelegate
  }))), /*#__PURE__*/React__default['default'].createElement(WalletSelection, {
    isOpen: isWalletSelectionOpen,
    wallets: wallets,
    onSelectWallet: handleSelectWallet,
    onClose: () => setIsWalletSelectionOpen(false)
  }), /*#__PURE__*/React__default['default'].createElement(DelegateDetails, {
    isOpen: isDelegateDetailsOpen,
    delegate: selectedDelegate,
    onClose: () => {
      setIsDelegateDetailsOpen(false);
      setSelectedDelegate(undefined);
    }
  }));
};

const entry = api => {
  api.launch().render( /*#__PURE__*/React__default['default'].createElement(WalletProvider, {
    api: api
  }, /*#__PURE__*/React__default['default'].createElement(MainPage, null)));
};

exports.default = entry;
