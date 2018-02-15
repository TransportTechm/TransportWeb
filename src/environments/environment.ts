// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  employeeServiceUrl: 'http://localhost:3000/transportationapi/employee/1.0/',
  transportServiceUrl: 'http://10.53.69.131:8080/transport/1.0/'
};
