import React, { ReactElement } from 'react';
import { useBarcode, BarcodeProps } from '../../hooks/useBarcode';

export default function Barcode(props: BarcodeProps): ReactElement {
  const { value, options } = props;
  const { inputRef } = useBarcode({
    value,
    options,
  });

  return <svg ref={inputRef} />;
}
