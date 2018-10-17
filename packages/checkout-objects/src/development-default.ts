function developmentDefault(prod: string, dev: string) {
  return process.env.NODE_ENV !== 'production' ? dev : prod;
}

export default developmentDefault;
