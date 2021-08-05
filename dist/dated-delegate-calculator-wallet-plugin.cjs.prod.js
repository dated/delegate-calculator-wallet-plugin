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
  Intl
} = globalThis.sdk;

const formatCrypto = ({
  locale = "en",
  value,
  showTicker = true,
  ...parameters
}) => {
  const ticker = parameters.ticker || "ARK";
  const numeral = Intl.Numeral.make(locale, {
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

const images = {
  calculator: {
    mimeType: "png",
    data: "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"
  }
};
const useImages = () => {
  const getImage = name => {
    const {
      mimeType,
      data
    } = images[name];
    return `data:image/${mimeType}+xml;base64,${data}`;
  };

  return {
    getImage
  };
};

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
  const {
    getImage
  } = useImages();

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
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: getImage("calculator")
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex flex-col w-1/2"
  }, /*#__PURE__*/React__default['default'].createElement("h1", null, "ARK Delegate Calculator"), renderContent(), /*#__PURE__*/React__default['default'].createElement("span", {
    className: "mt-20 font-semibold text-xs"
  }, "\xA9 ", new Date().getFullYear(), " dated / v1.0.0"))));
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
