/** @flow */
type $ExtractReturn<Fn> = $Call<<T>((...Array<any>) => T) => T, Fn>;

/** Saves an authorized braintree client to redux state */
export const saveTeardown = (payload: {}) => ({
  type: '@DATA_COLLECTOR/SAVE_TEARDOWN',
  payload,
});

/** Creates an action to save device data to redux state */
export const saveData = (payload: {}, loadedAt: number = Date.now()) => ({
  type: '@DATA_COLLECTOR/SAVE_DATA',
  loadedAt,
  payload,
});

/** Print errors to console directly during development */
const logErrors = (err) => {
  if (process.env.GATSBY_STAGE !== 'production') console.error(err);
};

/** Logs errors of unknown type to redux state */
export const saveError = (error: Error) => {
  logErrors(error);
  return { type: '@DATA_COLLECTOR/ERROR', error };
};

export type Actions =
  | $ExtractReturn<typeof saveError>
  | $ExtractReturn<typeof saveTeardown>
  | $ExtractReturn<typeof saveData>;
