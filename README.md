# GCP Bigtable Protobuf Bug Minimum Reproducable Example

## The issue
In the Bigtable SDK v6.2.0, there is probably an incorrectly imported protobuf somewhere, which interferes with Webpack's bundling capabitilies. 6.1.0 works great, so this bug was introduced in 6.2.0. **This is a major issue** because we trust that minor versions are fully backwards compatible, so we have our build system automatically upgrade packages using the package.json ^ syntax. This broke a lot of our production builds. Even just importing the library without using anything throws the below error
```
webpack:///./node_modules/protobufjs/src/root.js?:118
            throw err;
            ^

Error: ENOENT: no such file or directory, open '/workspaces/protos/google/bigtable/v2/response_params.proto'
    at Object.openSync (node:fs:561:18)
    at Object.readFileSync (node:fs:445:35)
    at fetch (webpack:///./node_modules/protobufjs/src/root.js?:195:34)
    at Root.load (webpack:///./node_modules/protobufjs/src/root.js?:231:13)
    at Root.loadSync (webpack:///./node_modules/protobufjs/src/root.js?:275:17)
    at Object.loadSync (webpack:///./node_modules/protobufjs/src/index-light.js?:69:17)
    at eval (webpack:///./node_modules/@google-cloud/bigtable/build/src/client-side-metrics/operation-metrics-collector.js?:24:27)
    at ./node_modules/@google-cloud/bigtable/build/src/client-side-metrics/operation-metrics-collector.js (/workspaces/gcp-bigtable-webpack-bug-reproduction/dist/index.js:139:1)
    at __webpack_require__ (/workspaces/gcp-bigtable-webpack-bug-reproduction/dist/index.js:8004:42)
    at eval (webpack:///./node_modules/@google-cloud/bigtable/build/src/client-side-metrics/metrics-config-manager.js?:17:39) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/workspaces/protos/google/bigtable/v2/response_params.proto'
}
```

## Reproducing:
1. Install NodeJS > 18 and NPM. I don't think NodeJS version impacts this bug. 
2. In this directory, run `npm install`
3. In this directory, run `npm run build`
4. In this directory, run `npm run start`
5. Observe the bug. You can also go into `package.json` and change the version of Bigtable from `6.2.0` to `6.1.0`, reinstall dependencies, rebuild, and start the program again. This will not cause the error to be thrown.  

## Additional Notes:
- Maybe related to this? https://github.com/googleapis/google-cloud-node/issues/2936