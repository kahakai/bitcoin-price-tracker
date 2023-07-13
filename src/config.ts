/**
 * Configuration of the service.
 * The configuration is constructed on service startup from the environment variables.
 */
interface Config {
  /**
   * Frequency in seconds to be used for the price updater.
   * Default is 10 seconds.
   */
  updateFrequency: number;

  /**
   * Commission in percents between 0 and 99 that the service will take from the price.
   * Default is 0.01.
   */
  serviceCommission: number;

  /**
   * HTTP port for the service.
   * Default is 3000.
   */
  port: number;
}

const parseEnv = (): Config => {
  const { UPDATE_FREQUENCY, SERVICE_COMMISSION, PORT } = process.env;

  let updateFrequency: number;
  if (UPDATE_FREQUENCY != null) {
    updateFrequency = Number(UPDATE_FREQUENCY);
  } else {
    updateFrequency = 10;
  }

  let serviceCommission: number;
  if (SERVICE_COMMISSION != null) {
    serviceCommission = Number(SERVICE_COMMISSION);
  } else {
    serviceCommission = 0.01;
  }

  let port: number;
  if (PORT != null) {
    port = Number(PORT);
  } else {
    port = 3000;
  }

  return {
    updateFrequency,
    serviceCommission,
    port,
  };
};

const config = parseEnv();

export { type Config, config };
