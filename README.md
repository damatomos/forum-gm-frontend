# Forum GM

Este documento descreve como trabalhar no projeto mantendo a coerência e organização das features. Garantindo um desenvolvimento seguro e sem anomalias ( eu espero ).

## Recomendações de IDE e Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Suporte do tipos em `.vue` Importados em TS

TypeScript não suporte arquivos .vue diretamente, o [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) cria os serviços para a utilização do typescript.

## Como iniciar?

Primeiro, faça um clone do projeto utilizando o comando abaixo:

```sh
git clone https://github.com/damatomos/forum-gm-frontend.git
```

Acesse o projeto em:

```sh
cd /forum-gm-frontend
```

Acesse a branch de desenvolvimento:

```sh
git checkout -b develop origin/develop
```

Crie uma branch para a sua feature a partir da branch develop

```sh
# example
git checkout -b feat-feed-view
```

Ao finalizar a feature, suba ela para o github e faça um PR para a develop

```sh
git push origin feat-feed-view
```

Volte para a develop e destrua a branch anterior e repita o processo

```sh
# Vá para a develop
git checkout develop
# Destrua a branch anterior
git branch -D feat-feed-view
# atualize a branch develop antes de criar uma nova feature
git pull origin develop
# Vá para a branch da nova feature
git checkout -b feat-new-feature
```

## Setup do Projeto

```sh
npm install
```

### Compilação e Hot-Reload para Desenvolvimento

O npm run dev foi customizado para ativar o lint na primeira compilação, garantindo um check-up do código antes de rodar. Porém, é importante utilizar o
comando do lint quando finalizar uma feature, facilitando a busca por possíveis erros não encontrados pela IDE.

```sh
npm run dev
```

### Build para Deploy

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

Permite a busca por smells e má formatação do código, caso exista.

```sh
npm run lint
```
