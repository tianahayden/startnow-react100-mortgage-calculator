import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let balance = parseFloat(this.props.balanceValue)
    let interestArray = []
    let paidOffArray = []
    let currentBalanceArray = []
    let year = 0
    let yearArray = []

    if (this.props.isToggle == true) {
      while (balance > 0) {
        let interest = balance * parseFloat(this.props.rateValue / 100)
        interestArray.push(interest.toFixed(2))

        let paidOff = (parseFloat(this.props.output) * 12) - interest
        paidOffArray.push(paidOff.toFixed(2))

        let currentBalance = balance - paidOff
        currentBalanceArray.push(currentBalance.toFixed(2))
        balance = currentBalance
        year++
        yearArray.push(year)
      }
    }

    yearArray.pop()
    interestArray.pop()
    paidOffArray.pop()
    currentBalanceArray.pop()



    if (this.props.isToggle == true) {
      return (
        <div>
          <div className="h6">Payments Over Time</div>
          <div className="table-responsive rounded border">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  {yearArray.map((e, i) => <th>Year {i + 1}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Interest Paid</td>
                  {interestArray.map((e, i) => <td>{interestArray[i]}</td>)}
                </tr>
                <tr>
                  <td>Total Paid Off</td>
                  {paidOffArray.map((e, i) => <td>{paidOffArray[i]}</td>)}
                </tr>
                <tr>
                  <td>Current Balance</td>
                  {currentBalanceArray.map((e, i) => <td>{currentBalanceArray[i]}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}


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
      isToggle: false
    };

    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.calculatePayment = this.calculatePayment.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.handleClick = this.handleClick.bind(this);

  };


  renderTable() {
    return (
      <Table
        isToggle={this.state.isToggle}
        balanceValue={this.state.balanceValue}
        termValue={this.state.termValue}
        rateValue={this.state.rateValue}
        output={this.state.output}
      />
    )
  }


  handleClick() {
    this.calculatePayment();

    this.setState({
      isToggle: true
    })
  }

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
    const rate = parseFloat(this.state.rateValue) / 100 / 12;
    const term = parseInt(this.state.termValue);
    const months = term * 12
    var calculation =
      // balance*rate*months
      balance * ((rate * ((1 + rate) ** months))) / ((((1 + rate) ** months) - 1))
    var output = calculation.toFixed(2)

    this.setState({
      output: output,
      outputText: 'Monthly Payment: $',
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

        <br />
        <h3 className='h1 text-center'>Mortgage Calculator</h3>
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
                <option value="10">10 years</option>
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" name="submit" onClick={this.handleClick} className="btn btn-primary btn-block">Submit</button>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className='h5' id="output">{outputText} {output}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            {this.state.isToggle === true ? this.renderTable() : null}
          </div>
        </div>
      </div>

    );
  }
}
