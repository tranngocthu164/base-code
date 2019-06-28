require('dotenv').config();

const EDGE_SERVICE_TOKEN = process.env.TARGET_EDGE_SERVICE_TOKEN;
const EDGE_SERVICE_BASE_URL = process.env.NG_PROXY_CONFIG_TARGET_BASE_URL_EDGE_SERVICE;
const EDGE_SERVICE_TARGET_ENVIRONMENT = (process.env.NG_PROXY_CONFIG_TARGET_ENVIRONMENT_EDGE_SERVICE || "").toUpperCase();

const EDGE_SERVICES_E2E = {
  DEV_NEW_DELTA: "http://gaming-site-model.delta.dev.max-sys.com.au",
  DEV_DELTA: "http://gaming-site-model.delta.dev.max-sys.com.au",
  DEV_ECHO: "http://gaming-site-model.echo.dev.max-sys.com.au",
};

const EDGE_SERVICES = {
  LOCAL_STUBBY: "http://localhost:4201",
  LOCAL_DOCKER: "http://gaming-site-model.local.max-test.com.au",
  ...EDGE_SERVICES_E2E,
};

const DEFAULT_TARGET_EDGE_SERVICE = EDGE_SERVICES.LOCAL_DOCKER;

const TARGET_EDGE_SERVICE = EDGE_SERVICE_BASE_URL || EDGE_SERVICES[EDGE_SERVICE_TARGET_ENVIRONMENT] || DEFAULT_TARGET_EDGE_SERVICE;
const IS_SECURED_TARGET = Object.values(EDGE_SERVICES_E2E).includes(TARGET_EDGE_SERVICE);

if (IS_SECURED_TARGET && !EDGE_SERVICE_TOKEN) {
  throw new Error(`A secured Edge service target has been configured by 'proxy.conf.js'. Please configure the environment variable: 'EDGE_SERVICE_TOKEN'`);
}

module.exports = [
  {
    bypass: (req, res, proxyOptions) => {
      if (IS_SECURED_TARGET) {
        req.headers["Authorization"] = `Bearer ${EDGE_SERVICE_TOKEN}`;
      }
    },
    changeOrigin: true,
    context: "/data/",
    logLevel: "debug",
    secure: false,
    target: TARGET_EDGE_SERVICE,
  },
];
