
type fields = {
  slice: string,
  payload: string,
  key: string,
};

export const updateAddressField = ({ slice, payload, key }: fields) => ({
  type: 'UPDATE_ADDRESS_FIELD',
  slice,
  payload,
  key,
});

export const validateAddress = () => ({ type: 'VALIDATE_ADDRESS' });

type Fn<T> = (...args: Array<any>) => T;
type ExtractReturn = <T>(Fn<T>) => T;

export type Actions =
  | $Call<ExtractReturn, typeof validateAddress>
  | $Call<ExtractReturn, typeof updateAddressField>;
