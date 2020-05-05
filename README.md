[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/bichikim/winter-love-quasar) 

# Quasar App

## ! Use Yarn for workspaces

adding Lerna is WIP

> WIP

## UI Example

![ui](./media/ui-example.gif)
![ui](./media/ui-example2.png)

## Trouble Shooting

### Cannot run karma by web-storm IDE

Set TS_NODE_PROJECT=null in your config

### SSL Error in DEV mode

> An SSL certificate error occurred when fetching the script.


Windows

- close all windows of chrome first

```
/Applications/Google/Chrome/Canary.app/Contents/MacOS/Google/Chrome
 --ignore-certificate-errors
 --unsafely-treat-insecure-origin-as-secure=https://localhost:8080
```

### In Windows 10

- npm install --global --production windows-build-tools

## Security

### Expect-CT header

https://securityheaders.com/

https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Expect-CT
https://atinove.com/post/5e6d87f1d215fd0a9d45f005/

### Web Application Firewall (WAF)

## Root?

the Root for ...

1. Deploy
2. Eslint
3. Prettier
4. Online editor (Gitpod)
5. Generate icons (icongenie)
6. ENV
7. Type settings (except packages/functions)

## Packages?

- functions: google firebase functions
- quasar: client app
- doc: vuepress doc + docgen for quasar (WIP)


## Known issue 


### browser zoom sometimes makes a scrollbar (quasar bug)

![issue](./media/issue0.PNG)


### css backdrop filter in firefox

Not support yet 

1. about:config

2. layout.css.backdrop-filter.enabled should be true for it


### Content-Security-Policy  style-src unsafe-inline 

unsafe-inline may be dangerous

### eslint - prettier
eslint ~6.4.0 for fix path bug for now

### node engine version issue
The Functions version is stubbornly fixed at 10, so it gets caught in yarn engine version checking.
Please use node.js version 10

## stacks

https://stackshare.io/winter-love/winter-love

