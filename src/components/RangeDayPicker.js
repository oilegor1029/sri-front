import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';

import 'moment/locale/en-gb';
import 'moment/locale/es';
import 'moment/locale/sv';

import 'react-day-picker/lib/style.css';
import '../style/RangeDayPicker.scss';

export class RangeDayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.fromRef = React.createRef();
    this.toRef = React.createRef();
    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.toRef.current.getDayPicker().showMonth(from);
    }
  }

  handleFromChange = (from, modifiers, dayPickerInput) => {
    // Change the from date and focus the "to" input field
    this.setState({ from }, this.props.dateFrom(from));
  };

  handleToChange = (to, modifiers, dayPickerInput) => {
    this.setState({ to }, this.showFromMonth, this.props.dateTo(to));
  };

  handleResetClick = () => {
    this.setState({ from: undefined, to: undefined }, this.props.resetDate(undefined, undefined));
    // this fixed the encapsulated input uncontrolled bug
    this.fromRef.current.setState({ value: '', typedValue: '' });
    this.toRef.current.setState({ value: '', typedValue: '' });
  };

  renderDayPicker(fromOrToInput) {
    const { from, to } = this.state;
    const { t } = this.props;
    const modifiers = { start: from, end: to };
    const isFrom = fromOrToInput === 'from';
    let datePickerConfig = {};
    if (isFrom) {
      datePickerConfig = {
        disabledDays: { after: to },
        toMonth: to,
        onDayClick: () => this.toRef.current.getInput().focus(),
      };
    } else {
      datePickerConfig = {
        disabledDays: { before: from },
        month: from,
        fromMonth: from,
      };
    }
    return (
      <div className={`input-from-to input-from-to--${fromOrToInput}`}>
        <label>{t(`filter.daypicker.${fromOrToInput}`)}</label>
        <DayPickerInput
          value={this.state[fromOrToInput]}
          ref={this[`${fromOrToInput}Ref`]}
          placeholder="dd/mm/yy"
          format="DD/MM/YY"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            ...datePickerConfig,
            locale: 'en',
            localeUtils: MomentLocaleUtils,
            selectedDays: [from, { from, to }],
            modifiers,
            numberOfMonths: 2,
          }}
          onDayChange={isFrom ? this.handleFromChange : this.handleToChange}
        />
      </div>
    );
  }
  renderResetDatesCTA() {
    const { t } = this.props;
    return (
      <button
        type="button"
        onClick={this.handleResetClick}
        data-action="reset"
        className="range-day-picker__reset_dates btn outline btn-remove"
      >
        {t('filter.date.clear')}
      </button>
    );
  }
  render() {
    return (
      <div className="range-day-picker">
        {this.renderDayPicker('from')}
        {this.renderDayPicker('to')}
        {this.renderResetDatesCTA()}
      </div>
    );
  }
}

RangeDayPicker.propTypes = {
  dateTo: PropTypes.func.isRequired,
  dateFrom: PropTypes.func.isRequired,
  resetDate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(RangeDayPicker);
