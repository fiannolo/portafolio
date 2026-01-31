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

  const toggleSign = () => setDisplay(String(-parseFloat(display)));
  const inputPercent = () => setDisplay(String(parseFloat(display) / 100));

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
      case '/': return prev / curr;
      default: return curr;
    }
  };

  const equals = () => {
    if (!operation || previousValue === null) return;
    const result = calculate(previousValue, parseFloat(display), operation);
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const Button = ({ onClick, children, className = '', wide = false }) => (
    <button
      onClick={onClick}
      className={`h-[32px] rounded text-[14px] font-medium ${wide ? 'col-span-2' : ''} ${className}`}
      style={{
        background: 'linear-gradient(180deg, #f8f8f8 0%, #e0e0e0 100%)',
        border: '1px solid #a0a0a0',
        boxShadow: 'inset 0 1px 0 #fff, 0 1px 2px rgba(0,0,0,0.1)',
        color: '#333',
      }}
    >
      {children}
    </button>
  );

  const OpButton = ({ onClick, children, active }) => (
    <button
      onClick={onClick}
      className="h-[32px] rounded text-[14px] font-semibold"
      style={{
        background: active
          ? 'linear-gradient(180deg, #ffcc50 0%, #ff9900 100%)'
          : 'linear-gradient(180deg, #ffaa30 0%, #e88800 100%)',
        border: '1px solid #c06800',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
        color: '#fff',
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full flex flex-col" style={{ background: '#3a3a3a' }}>
      {/* Display */}
      <div
        className="mx-2 mt-2 mb-2 h-[48px] px-3 flex items-center justify-end rounded"
        style={{
          background: 'linear-gradient(180deg, #4a5a4a 0%, #3a4a3a 100%)',
          border: '1px solid #2a3a2a',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
        }}
      >
        <span
          className="text-[24px] font-light"
          style={{
            color: '#88ff88',
            fontFamily: 'Monaco, Menlo, monospace',
            textShadow: '0 0 6px rgba(100, 255, 100, 0.4)',
          }}
        >
          {display.length > 9 ? parseFloat(display).toExponential(4) : display}
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-1 p-2 flex-1">
        <Button onClick={clear} className="!text-red-600">C</Button>
        <Button onClick={toggleSign}>±</Button>
        <Button onClick={inputPercent}>%</Button>
        <OpButton onClick={() => performOperation('/')} active={operation === '/'}>÷</OpButton>

        <Button onClick={() => inputDigit('7')}>7</Button>
        <Button onClick={() => inputDigit('8')}>8</Button>
        <Button onClick={() => inputDigit('9')}>9</Button>
        <OpButton onClick={() => performOperation('*')} active={operation === '*'}>×</OpButton>

        <Button onClick={() => inputDigit('4')}>4</Button>
        <Button onClick={() => inputDigit('5')}>5</Button>
        <Button onClick={() => inputDigit('6')}>6</Button>
        <OpButton onClick={() => performOperation('-')} active={operation === '-'}>−</OpButton>

        <Button onClick={() => inputDigit('1')}>1</Button>
        <Button onClick={() => inputDigit('2')}>2</Button>
        <Button onClick={() => inputDigit('3')}>3</Button>
        <OpButton onClick={() => performOperation('+')} active={operation === '+'}>+</OpButton>

        <Button onClick={() => inputDigit('0')} wide>0</Button>
        <Button onClick={inputDecimal}>.</Button>
        <OpButton onClick={equals}>=</OpButton>
      </div>
    </div>
  );
}
