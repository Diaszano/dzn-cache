<h1 align="center"> DZN Cache</h1>

<h2 align="center"> Sistema de Cache para TypeScript </h2>

<h2 align="center">🚧 Projeto em desenvolvimento! 🚧</h2>

Este projeto consiste em uma biblioteca para implementação de cache em
aplicações TypeScript. Com o uso do cache, é possível reduzir a latência e
melhorar o desempenho de aplicações que necessitam de acesso frequente a
dados ou processos.

## Instalação

Para instalar a biblioteca, basta utilizar o gerenciador de pacotes npm:

🚧 Não disponível ainda 🚧

```shell
npm i dzn-cache
```

## Utilização

Para utilizar o cache em sua aplicação, é necessário importar a
classe Cache da biblioteca:

```typescript
import {Cache} from 'cache-ts';
```

Em seguida, é possível criar uma instância da classe Cache e utilizá-la para
armazenar e recuperar dados em cache:

```typescript
const cache = new Cache();

// Armazena um valor em cache por 5 minutos
cache.remember('chave', 'valor', 5 * 60 * 1000);

// Recupera um valor armazenado em cache
const valor = cache.get('chave');
```

Também será possível utilizar callbacks para armazenamento e recuperação de dados em cache:

```typescript
const cache = new Cache();

// Armazena um valor em cache por 5 minutos
cache.remember('chave', () => {
    const valor = 'valor caro de ser computado';
    return valor;
}, 5 * 60 * 1000);

// Recupera um valor armazenado em cache
const valor = cache.get('chave');
```

Ou ainda, utilizar a função getOrSet para recuperar um valor
em cache ou armazená-lo caso não exista:

```typescript
const cache = new Cache();

// Recupera um valor armazenado em cache ou calcula e armazena caso não exista
const valor = cache.remember('chave', () => {
    const valor = 'valor caro de ser computado';
    return valor;
}, 5 * 60 * 1000);
```

## Contribuição

Contribuições são sempre bem-vindas! Se você deseja contribuir com
este projeto, por favor abra uma issue ou uma pull request.