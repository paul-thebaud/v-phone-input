# Contributing

Contributions are **welcome** and will be fully **credited**.

We accept contributions via Pull Requests on
[GitHub](https://github.com/paul-thebaud/v-phone-input).

Informal discussion regarding bugs, new features, and implementation of existing features takes
place in the
[GitHub issue page](https://github.com/paul-thebaud/v-phone-input/issues).

## Pull Requests

- **Lint your code.** Make sure your code follows our coding standards by running `yarn lint` on the
  CLI.

- **Add tests!** Your patch won't be accepted if it does not have tests.

- **Document any change in behaviour.** Make sure the `README.md` and any other relevant
  documentation are kept up-to-date.

- **Create feature branches.** Don't ask us to pull from your master branch.

- **One pull request per feature.** If you want to do more than one thing, send multiple pull
  requests.

- **Send coherent history.** Make sure each individual commit in your pull request is meaningful. We
  try to follow the
  [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

**Happy coding**!

## Useful commands

> Notice that we use Yarn as our package manager.

### Running dev app

```shell
yarn dev
```

### Building dev app for publish

``` shell
yarn demo:build
```

### Previewing built dev app

``` shell
yarn demo:preview
```

### Linting code

``` shell
yarn lint
```

### Running E2E Tests

``` shell
yarn test:e2e
```

### Running Unit Tests

``` shell
yarn test:unit
```

### Building library for publish

``` shell
yarn lib:build
```
