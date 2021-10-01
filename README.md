## 参考

- [project-awesome.org](https://project-awesome.org/)
- [Java 全栈知识体系](https://pdai.tech/)
- [调试排错 - Java问题排查](https://pdai.tech/md/java/jvm/java-jvm-debug-tools-linux.html)
- [Reference documentation](https://docs.docker.com/reference/)
- [JS SDK](https://cusdis.com/doc#/advanced/sdk)
- [跟我一起写Makefile](https://seisman.github.io/how-to-write-makefile/introduction.html)
- [TOML<->JSON Online converter](https://pseitz.github.io/toml-to-json-online-converter/)

## 文档

- [Redux vs Recoil](https://segmentfault.com/a/1190000023718977)
- [React Router](https://reactrouter.com/web/example/basic)
- [Recoil - Getting Started](https://recoiljs.org/docs/introduction/getting-started)
- [REST Client - 文档](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## 工具

- `npm i marked`
- [Badge](https://shields.io)
- [TOML Editor](https://pseitz.github.io/toml-to-json-online-converter/)

## 日期格式

- [Java - Date and Time Patterns](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html)

## 语句

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
