import React, { Component } from 'react';
import QuoteRightNav from './QuoteRightNav';
import QuoteTopNav from './QuoteTopNav';
import QuoteList from './QuoteList';
import styles from './Quotes.css';
import cx from 'classnames';
import LoadingIndicator from 'app/components/LoadingIndicator';

type Props = {
  sortType: String,
  query: Object,
  quotes: Array<Object>
};

export default function QuotePage({
  sortType,
  query,
  quotes,
  ...props
}: Props) {
  if (quotes.length === 0) {
    return <LoadingIndicator loading />;
  }
  return (
    <div className={cx(styles.root, styles.quoteContainer)}>
      <div className={styles.quotepageLeft}>
        <QuoteTopNav {...props} query={query} sortType={sortType} />
        <QuoteList {...props} quotes={quotes} sortType={sortType} />
      </div>

      <QuoteRightNav query={query} />
    </div>
  );
}
