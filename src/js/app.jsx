import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor() {
    super();
    this.state = {
      balanceValue: '0',
      rateValue: '0',
      termValue: '15',
      output: '',
      outputText: '',
    };

    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.calculatePayment = this.calculatePayment.bind(this);

  };

  handleBalanceChange(event) {
    this.setState({
      balanceValue: event.target.value
    });
  };

  handleRateChange(event) {
    this.setState({
      rateValue: event.target.value
    });
  };

  handleTermChange(event) {
    this.setState({
      termValue: event.target.value
    });
  };


  calculatePayment() {
    const balance = parseFloat(this.state.balanceValue);
    const rate = (parseFloat(this.state.rateValue)) / 100 / 12;
    const term = parseInt(this.state.termValue);
    const months = term * 12
    var calculation =
      // balance*rate*months
      balance * ((rate * ((1 + rate)**months))) / ((((1 + rate)**months) - 1))
    var output = calculation.toFixed(2)

    this.setState({
      output: output,
      outputText: "is your payment.",
    })

  };



  render() {
    const balance = this.state.balanceValue;
    const rate = this.state.rateValue;
    const term = this.state.termValue;
    const output = this.state.output;
    const outputText = this.state.outputText;


    return (
      <div className='container'>

        <div className='h1 text-center'>Mortgage Calculator</div>
        <br />

        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">Loan Balance</label>
            <div className="col-sm-10">
              <input value={balance} onChange={this.handleBalanceChange} name="balance" type="number" className="form-control" id="loanBalance" placeholder='Balance' />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Percent Interest Rate</label>
            <div className="col-sm-10">
              <input value={rate} onChange={this.handleRateChange} name="rate" type="number" step="0.01" className="form-control" id="interestRate" placeholder="Interest Rate" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Loan Term</label>
            <div className="col-sm-10">
              <select value={term} onChange={this.handleTermChange} name="term" className="form-control" id="loanTerms">
                <option value="15">15 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" name="submit" onClick={this.calculatePayment} className="btn btn-default">Submit</button>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div id="output">{output} {outputText}</div>
            </div>
          </div>
        </div>



      </div>
    );
  }
}
