import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import Input from "../ui/Input.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function MortgageCalculator({ propertyPrice = 0 }) {
  const [downPayment, setDownPayment] = useState(Math.round(propertyPrice * 0.2));
  const [interestRate, setInterestRate] = useState(18);
  const [years, setYears] = useState(15);

  const monthlyPayment = useMemo(() => {
    const principal = Math.max(propertyPrice - downPayment, 0);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0 || numPayments === 0) return principal / (numPayments || 1);

    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    return isFinite(payment) ? payment : 0;
  }, [propertyPrice, downPayment, interestRate, years]);

  return (
    <div className="bg-surface-light rounded-lg p-6">
      <p className="flex items-center gap-2 font-serif text-h4 text-navy-900 mb-1">
        <Calculator size={18} className="text-gold-500" /> Mortgage Calculator
      </p>
      <p className="text-[13px] text-slate-400 mb-6">
        This is an estimate only. Actual terms depend on your chosen lender.
      </p>

      <div className="space-y-5">
        <Input
          type="number"
          label="Down Payment (₦)"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-small font-medium text-navy-800">Interest Rate</label>
            <span className="text-small text-gold-600 font-semibold">{interestRate}%</span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={0.5}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-gold-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-small font-medium text-navy-800">Loan Term</label>
            <span className="text-small text-gold-600 font-semibold">{years} years</span>
          </div>
          <input
            type="range"
            min={5}
            max={25}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-gold-500"
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-small text-slate-500 mb-1">Estimated Monthly Payment</p>
        <p className="font-serif text-h2 text-navy-900">{formatCurrency(Math.round(monthlyPayment))}</p>
      </div>
    </div>
  );
}
