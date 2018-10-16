/** @flow */
type $ExtractReturn<Fn> = $Call<<T>((...Array<any>) => T) => T, Fn>;

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

export type Actions =
  | $ExtractReturn<typeof validateAddress>
  | $ExtractReturn<typeof updateAddressField>;
