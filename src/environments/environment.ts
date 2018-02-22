// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  employeeServiceUrl: 'https://employeeservicetechm.cfapps.io/employee/1.0/',
  transportServiceUrl: 'https://zuul-gateway-one.cfapps.io/api/transport/transport/1.0/',
  vendorServiceUrl: 'https://zuulgateway.cfapps.io/api/vendor/1.0/'

};
