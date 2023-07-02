class LoanAmount {
    constructor(amount) {
        this.amount = amount
    }
    validate() {
        if (this.amount < 0 || !this.amount) {
            console.log("Amount should be positive")
            return
        }
        if (this.amount > 10000000) {
            console.log("Amount should be less than 1 crore")
            return
        }
    }
}

class Percentage {
    constructor(interestRate) {
        this.interestRate = interestRate
    }

    validate() {
        if (this.interestRate < 0 || !this.interestRate) {
            console.log("interestRate should be positive")
            return
        }
        if (this.interestRate > 100) {
            console.log("interestRate should be less than 100")
            return
        }
    }
}

class MonthlyTenure {
    // constructor(totalMonths){
    //   this.totalMonths = totalMonths
    // }
    validate(months) {
        if (months > 360) {
            console.log("Months shouldn't exceed 360 months")
            return
        }
        if (months < 10) {
            console.log("Months should be atleast 10 months")
            return
        }
    }
}

class YearlyTenure {
    // constructor(totalYears){
    //   this.totalYears = totalYears
    // }
    validate(years) {
        if (years > 30) {
            console.log("Years shouldn't exceed 30 years")
            return
        }
        if (years < 1) {
            console.log("Years should be atleast 1 year")
            return
        }
    }
}


class Tenure {
    constructor(tenureMethod, period) {
        this.tenureMethod = tenureMethod
        this.period = period
    }
}


class CalculateEMI {
    constructor(loanAmount, interestRate, tenure) {
        this.loanAmount = loanAmount
        this.interestRate = interestRate
        this.tenure = tenure
    }
    validateAmount() {
        this.loanAmount.validate()
        return
    }

    validatePercentage() {
        this.interestRate.validate()
        return
    }

    validateTenure() {
        this.tenure.tenureMethod.validate(this.tenure.period)
        return
    }

    calculateTotalEmi() {
        let periodConversion
        if (this.tenure.tenureMethod instanceof MonthlyTenure) {
            periodConversion = this.tenure.period / 12
        }
        else periodConversion = this.tenure.period
        const res = (this.loanAmount.amount * (this.interestRate.interestRate / 100)) * periodConversion
        return res
    }
}


const janakiEMI = new CalculateEMI(new LoanAmount(1200000), new Percentage(15.5), new Tenure(new YearlyTenure(), 10))
janakiEMI.validateAmount()
janakiEMI.validatePercentage()
janakiEMI.validateTenure()
const totalLoanAmount = janakiEMI.calculateTotalEmi()
console.log(totalLoanAmount)
