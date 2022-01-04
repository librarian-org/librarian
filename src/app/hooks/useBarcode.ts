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
