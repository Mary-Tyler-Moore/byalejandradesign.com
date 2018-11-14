/** @flow */
type $ExtractReturn<Fn> = $Call<<T>((...Array<any>) => T) => T, Fn>;

/** Saves an authorized braintree client to redux state */
export const saveClient = (payload: {}, loadedAt: number = Date.now()) => ({
  type: '@BRAINTREE/SAVE_CLIENT',
  loadedAt,
  payload,
});

/** Print errors to console directly during development */
const logErrors = (err) => {
  if (process.env.STAGE !== 'production') console.error(err);
};

/** Logs errors of unknown type to redux state */
export const saveError = (error: Error) => {
  logErrors(error);
  return { type: '@BRAINTREE/ERROR', error };
};

export type Actions =
  | $ExtractReturn<typeof saveError>
  | $ExtractReturn<typeof saveClient>;
