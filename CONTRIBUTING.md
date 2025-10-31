# Contributing

Contributions are **welcome** and will be fully **credited**.

We accept contributions via Pull Requests on
[GitHub](https://github.com/paul-thebaud/v-phone-input).

Informal discussion regarding bugs, new features, and implementation of existing features takes
place in the
[GitHub issue page](https://github.com/paul-thebaud/v-phone-input/issues).

## Pull Requests

- **Lint your code.** Make sure your code follows our coding standards by running `make lint` on the
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

Development environment requires docker.

### Starting containers

```shell
make up
```

### Packaging lib

```shell
make package
```

### Generate lib API reference

```shell
make typedoc
```

### Starting docs website

```shell
make dev
```

Docs website is available on [vphoneinput.localhost](http://vphoneinput.localhost).

### Linting code

```shell
pnpm lint
```

### Running unit tests

```shell
make test-unit
```

### Running E2E tests

```shell
make test-e2e
```
