import { useState, useCallback } from 'react';

export function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit) => {
    setDisplay(prev => {
      if (waitingForOperand) {
        setWaitingForOperand(false);
        return digit;
      }
      return prev === '0' ? digit : prev + digit;
    });
  }, [waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else {
      setDisplay(prev => prev.includes('.') ? prev : prev + '.');
    }
  }, [waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const toggleSign = useCallback(() => {
    setDisplay(prev => String(-parseFloat(prev)));
  }, []);

  const inputPercent = useCallback(() => {
    setDisplay(prev => String(parseFloat(prev) / 100));
  }, []);

  const calculate = (prev, curr, op) => {
    switch (op) {
      case '+': return prev + curr;
      case '-': return prev - curr;
      case '*': return prev * curr;
      case '/': return curr !== 0 ? prev / curr : 0;
      default: return curr;
    }
  };

  const performOperation = useCallback((nextOp) => {
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
  }, [display, previousValue, operation]);

  const equals = useCallback(() => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(previousValue, inputValue, operation);

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  }, [display, previousValue, operation]);

  // Button style helper
  const getButtonStyle = (type) => {
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
        textShadow: '0 -1px 0 rgba(0,0,0,0.2)',
      },
      equals: {
        background: 'linear-gradient(180deg, #6ab4f5 0%, #3890d5 50%, #2070c0 100%)',
        border: '1px solid #1860a0',
        color: '#fff',
        textShadow: '0 -1px 0 rgba(0,0,0,0.2)',
      },
    };
    return {
      ...styles[type],
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.15)',
    };
  };

  const buttonClass = "h-[40px] rounded-[4px] text-[18px] font-semibold cursor-pointer select-none active:opacity-80";

  return (
    <div
      className="h-full flex flex-col p-3"
      style={{ background: 'linear-gradient(180deg, #d8d8d8 0%, #c0c0c0 100%)' }}
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
          style={{ color: '#2a3a2a', fontFamily: 'Monaco, "Courier New", monospace' }}
        >
          {display.length > 10 ? parseFloat(display).toExponential(5) : display}
        </span>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-[6px] flex-1 content-start">
        {/* Row 1 */}
        <button className={buttonClass} style={getButtonStyle('function')} onClick={clear}>C</button>
        <button className={buttonClass} style={getButtonStyle('function')} onClick={toggleSign}>±</button>
        <button className={buttonClass} style={getButtonStyle('function')} onClick={inputPercent}>%</button>
        <button className={buttonClass} style={getButtonStyle('operator')} onClick={() => performOperation('/')}>÷</button>

        {/* Row 2 */}
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('7')}>7</button>
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('8')}>8</button>
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('9')}>9</button>
        <button className={buttonClass} style={getButtonStyle('operator')} onClick={() => performOperation('*')}>×</button>

        {/* Row 3 */}
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('4')}>4</button>
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('5')}>5</button>
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('6')}>6</button>
        <button className={buttonClass} style={getButtonStyle('operator')} onClick={() => performOperation('-')}>−</button>

        {/* Row 4 */}
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('1')}>1</button>
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('2')}>2</button>
        <button className={buttonClass} style={getButtonStyle('number')} onClick={() => inputDigit('3')}>3</button>
        <button className={buttonClass} style={getButtonStyle('operator')} onClick={() => performOperation('+')}>+</button>

        {/* Row 5 */}
        <button className={`${buttonClass} col-span-2`} style={getButtonStyle('number')} onClick={() => inputDigit('0')}>0</button>
        <button className={buttonClass} style={getButtonStyle('number')} onClick={inputDecimal}>.</button>
        <button className={buttonClass} style={getButtonStyle('equals')} onClick={equals}>=</button>
      </div>
    </div>
  );
}
