```sh
npm i -S --legacy-peer-deps pkg-name

npm config set legacy-peer-deps true

npm install --prefix site
npm run --prefix site start

yarn upgrade --latest

git submodule add git@github.com:MurphyL/dynamic-react-component.git site/src/plug/drc
```
- [react-svg-map](https://www.npmjs.com/package/react-svg-map)
- [react-heat-map](https://github.com/uiwjs/react-heat-map)
- [react-burger-menu](https://hamburger-react.netlify.app/)

## 参考

- [JS SDK](https://cusdis.com/doc#/advanced/sdk)
- [跟我一起写Makefile](https://seisman.github.io/how-to-write-makefile/introduction.html)
- [TOML<->JSON Online converter](https://pseitz.github.io/toml-to-json-online-converter/)
- Vercle 中国区镜像 - `cname-china.vercel-dns.com`


## 文档

- [Redux vs Recoil](https://segmentfault.com/a/1190000023718977)
- [React Router](https://reactrouter.com/web/example/basic)
- [Recoil - Getting Started](https://recoiljs.org/docs/introduction/getting-started)
- [REST Client - 文档](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## 工具

- [Badge](https://shields.io)
- [TOML Editor](https://pseitz.github.io/toml-to-json-online-converter/)
- [极客教程](https://geek-docs.com/)
- [GraphQL Document - Queries and Mutations](https://graphql.org/learn/queries/)
- jmespath
- [monaco-editor - code highlighting](https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-syntax-highlighting-for-html-elements)
- npm.js - base
- npm.js - vfile
- Templage Engine - https://www.npmjs.com/package/sprintf-js
- https://www.npmjs.com/package/nanoid
- https://www.svgrepo.com/collections/all/

## 日期格式

- [Java - Date and Time Patterns](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html)
- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_date-format)

## 语句

> https://docs.github.com/en/graphql/overview/explorer

```graphql
query {
  viewer {
    login
  }
  user(login: "MurphyL") {
    login,
    name,
    email,
    bio,
    repository(name: "murphyl.com") {
      homepageUrl,
      description,
      issue(number: 33) {
        number,
        id,
        title,
        bodyText
      }
      issues(labels: ["X-TOML"], first: 10) {
        nodes {
          number,
          id,
          title,
          bodyText
        }
      }
    }
  }
}
```
