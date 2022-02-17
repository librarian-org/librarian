/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

interface Options {
  format?: string;
  width?: number;
  height?: number;
  displayValue?: boolean;
  text?: string;
  fontOptions?: string;
  font?: string;
  textAlign?: string;
  textPosition?: string;
  textMargin?: number;
  fontSize?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  flat?: boolean;
  valid?: (valid: boolean) => void;
}

export interface BarcodeProps {
  value: string;
  options?: Options;
}

const checksum = (number: string): number => {
  const res = number
    .substring(0, 12)
    .split('')
    .map((n) => +n)
    .reduce((sum, a, idx) => (idx % 2 ? sum + a * 3 : sum + a), 0);

  return (10 - (res % 10)) % 10;
};

export function isValidEAN13(value: string): boolean {
  return value.search(/^[0-9]{13}$/) !== -1 && +value[12] === checksum(value);
}

export function useBarcode({ ...props }: BarcodeProps): any {
  const inputRef = useRef();
  const { value, options } = props;

  useEffect(() => {
    if (inputRef) {
      const ref = inputRef as any;
      JsBarcode(ref.current, value, options);
    }
  }, [value, options]);

  return { inputRef };
}
