import { useState } from 'react';

export function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOp) => {
    const inputValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const calculate = (prev, curr, op) => {
    switch (op) {
      case '+': return prev + curr;
      case '-': return prev - curr;
      case '*': return prev * curr;
      case '/': return curr !== 0 ? prev / curr : 'Error';
      default: return curr;
    }
  };

  const equals = () => {
    if (!operation || previousValue === null) return;
    const inputValue = parseFloat(display);
    const result = calculate(previousValue, inputValue, operation);
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  // Tiger Calculator Button Style
  const CalcButton = ({ onClick, children, type = 'number', span = 1 }) => {
    const styles = {
      number: {
        background: 'linear-gradient(180deg, #fafafa 0%, #e8e8e8 50%, #d8d8d8 100%)',
        border: '1px solid #a0a0a0',
        color: '#1a1a1a',
      },
      function: {
        background: 'linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 50%, #c0c0c0 100%)',
        border: '1px solid #909090',
        color: '#333',
      },
      operator: {
        background: 'linear-gradient(180deg, #7ab8f0 0%, #4a98e0 50%, #3888d0 100%)',
        border: '1px solid #2868a0',
        color: '#fff',
      },
      equals: {
        background: 'linear-gradient(180deg, #6ab4f5 0%, #3890d5 50%, #2070c0 100%)',
        border: '1px solid #1860a0',
        color: '#fff',
      },
    };

    const style = styles[type];

    return (
      <button
        onClick={onClick}
        className={`h-[38px] rounded-[4px] text-[16px] font-semibold active:brightness-90 ${
          span === 2 ? 'col-span-2' : ''
        }`}
        style={{
          ...style,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.15)',
          textShadow: type === 'operator' || type === 'equals' ? '0 -1px 0 rgba(0,0,0,0.2)' : 'none',
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <div
      className="h-full flex flex-col p-3"
      style={{
        background: 'linear-gradient(180deg, #d8d8d8 0%, #c0c0c0 100%)',
      }}
    >
      {/* LCD Display */}
      <div
        className="mb-3 h-[52px] px-4 flex items-center justify-end rounded-[4px]"
        style={{
          background: 'linear-gradient(180deg, #d8e8d0 0%, #c8dcc0 50%, #b8ccb0 100%)',
          border: '1px solid #90a088',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.5)',
        }}
      >
        <span
          className="text-[28px] font-light tracking-tight"
          style={{
            color: '#2a3a2a',
            fontFamily: '"SF Mono", Monaco, "Courier New", monospace',
          }}
        >
          {display.length > 10 ? parseFloat(display).toExponential(5) : display}
        </span>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-[6px] flex-1">
        <CalcButton onClick={clear} type="function">C</CalcButton>
        <CalcButton onClick={toggleSign} type="function">±</CalcButton>
        <CalcButton onClick={inputPercent} type="function">%</CalcButton>
        <CalcButton onClick={() => performOperation('/')} type="operator">÷</CalcButton>

        <CalcButton onClick={() => inputDigit('7')}>7</CalcButton>
        <CalcButton onClick={() => inputDigit('8')}>8</CalcButton>
        <CalcButton onClick={() => inputDigit('9')}>9</CalcButton>
        <CalcButton onClick={() => performOperation('*')} type="operator">×</CalcButton>

        <CalcButton onClick={() => inputDigit('4')}>4</CalcButton>
        <CalcButton onClick={() => inputDigit('5')}>5</CalcButton>
        <CalcButton onClick={() => inputDigit('6')}>6</CalcButton>
        <CalcButton onClick={() => performOperation('-')} type="operator">−</CalcButton>

        <CalcButton onClick={() => inputDigit('1')}>1</CalcButton>
        <CalcButton onClick={() => inputDigit('2')}>2</CalcButton>
        <CalcButton onClick={() => inputDigit('3')}>3</CalcButton>
        <CalcButton onClick={() => performOperation('+')} type="operator">+</CalcButton>

        <CalcButton onClick={() => inputDigit('0')} span={2}>0</CalcButton>
        <CalcButton onClick={inputDecimal}>.</CalcButton>
        <CalcButton onClick={equals} type="equals">=</CalcButton>
      </div>
    </div>
  );
}
