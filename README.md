<header>
<div align="center">

<a href="https://github.com/Diaszano">
    <img src="docs/assets/logo.svg" alt="logo" height="90" align="center">
</a>

<h1 align="center">dzn-cache</h1>

<p>Uma solução simplificada de cache para TypeScript</p>

<a href="https://www.npmjs.com/package/dzn-cache">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/diaszano/dzn-cache?color=green">
</a>

<a href="https://www.npmjs.com/package/dzn-cache">
    <img alt="npm" src="https://img.shields.io/npm/dt/dzn-cache?color=green">
</a>

<a href="https://github.com/Diaszano/dzn-cache">
    <img alt="GitHub" src="https://img.shields.io/github/license/diaszano/dzn-cache?color=green">
</a>

<a href="https://github.com/Diaszano/dzn-cache">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/diaszano/dzn-cache?color=green">
</a>

<h2>🚧 Projeto em desenvolvimento! 🚧</h2>

</div>
</header>

## Introdução

O pacote que apresentamos é uma solução prática e eficiente para implementar cache em projetos TypeScript, utilizando as
poderosas ferramentas Redis ou Memcached. Com esse pacote, você terá acesso a uma variedade de métodos simplificados que
permitirão o gerenciamento fácil e rápido de dados em cache.

O objetivo principal deste pacote é simplificar a implementação de cache, fornecendo uma interface intuitiva e de fácil
utilização. Com ele, você poderá armazenar, recuperar, verificar a existência e excluir dados em cache com apenas
algumas linhas de código.

Ao utilizar Redis ou Memcached como backend de cache, você se beneficiará de suas características de alta velocidade,
escalabilidade e capacidade de armazenar grandes volumes de dados. Essas tecnologias são amplamente adotadas e
confiáveis, garantindo que seu cache funcione de maneira eficiente e confiável.

Além disso, o pacote foi desenvolvido especificamente para TypeScript, aproveitando os recursos dessa linguagem para
fornecer uma experiência de desenvolvimento fluída. Com suporte a tipos estáticos, você terá a garantia de que seu
código está correto em tempo de compilação, reduzindo erros e melhorando a manutenibilidade do seu projeto.

Em resumo, nosso pacote de cache simplificado para TypeScript com Redis ou Memcached é a escolha ideal para agilizar o
processo de implementação de cache em seus projetos. Com sua interface intuitiva e métodos simplificados, você poderá
aproveitar ao máximo as vantagens do cache, aumentando a performance e a eficiência de suas aplicações.

## Instalação

Para instalar a biblioteca de forma profissional, utilize o gerenciador de pacotes npm da seguinte maneira:

```shell
npm i dzn-cache
```

## Utilização

🚧 No momento só temos a implementação para o Redis! 🚧

Para utilizar o cache em sua aplicação, é necessário importar a
classe CacheModelInterface da biblioteca:

```typescript
import Cache from 'dzn-cache';
```

Em seguida, é possível criar uma instância da classe **Cache** e utilizá-la para
armazenar e recuperar dados em cache:

```typescript
const cache = new Cache();

// Armazena um valor em cache por 5 minutos
cache.remember('key', 'Siga o Diaszano no GitHub.', 5 * 60 * 1000);

// Recupera um valor armazenado em cache
const valor = cache.get('key');
```

Também será possível utilizar callbacks para armazenamento e recuperação de dados em cache:

```typescript
const cache = new Cache();

// Armazena um valor em cache por 5 minutos
cache.remember('key', (): string => {
    const valor = 'Siga o Diaszano no GitHub.';
    return valor;
}, 5 * 60 * 1000);

// Recupera um valor armazenado em cache
const valor = cache.get('key');
```

Temos também outros métodos, e eles são:

```typescript
import Cache from 'dzn-cache';

const cache = new Cache();

/**
 * Limpa todos os dados do cache.
 * @returns {Promise<void>}
 */
const promise_flush: Promise<void> = cache.flush();

/**
 * Retorna o valor armazenado no cache para a chave informada.
 * @param {string} key - A chave para buscar o valor.
 * @returns {Promise<string|null>} - O valor armazenado ou null se não houver valor para a chave.
 */
const promise_get: Promise<string | null> = cache.get('key');

/**
 * Verifica se existe um valor armazenado para a chave informada.
 * @param {string} key - A chave para verificar a existência do valor.
 * @returns {Promise<boolean>} - True se existe valor armazenado ou False caso contrário.
 */
const promise_has: Promise<boolean> = cache.has('key');

/**
 * Retorna o valor armazenado no cache para a chave informada e o remove do cache.
 * @param {string} key - A chave para buscar o valor.
 * @returns {Promise<string|null>} - O valor armazenado ou null se não houver valor para a chave.
 */
const promise_pull: Promise<string | null> = cache.pull('key');

/**
 * Remove a chave e o valor associado do cache.
 * @param {string} key - A chave para remover.
 * @returns {Promise<void>}
 */
const promise_forget: Promise<void> = cache.forget('key');

/**
 * Armazena um valor no cache para a chave informada por um tempo determinado.
 * @param {string} key - A chave para armazenar o valor.
 * @param {string | (() => string)} value - O valor a ser armazenado. Pode ser uma string ou um callback que retorna uma string.
 * @param {number} seconds - O tempo de vida do valor em segundos. Se não for informado, o valor será armazenado indefinidamente.
 * @returns {Promise<void>}
 */
const promise_set: Promise<void> = cache.set('chave', (): string => {
    const valor = 'Siga o Diaszano no GitHub.';
    return valor;
}, 5 * 60 * 1000);

/**
 * Armazena um valor no cache para a chave informada por um tempo determinado caso não exista.
 * @param {string} key - A chave para armazenar o valor.
 * @param {string | (() => string)} value - O valor a ser armazenado. Pode ser uma string ou um callback que retorna uma string.
 * @param {number} seconds - O tempo de vida do valor em segundos. Se não for informado, o valor será armazenado indefinidamente.
 * @returns {Promise<void>}
 */
const promise_add: Promise<void> = cache.add('chave', (): string => {
    const valor = 'Siga o Diaszano no GitHub.';
    return valor;
}, 5 * 60 * 1000);

/**
 * Armazena um valor no cache para a chave informada por um tempo indefinido.
 * @param {string} key - A chave para armazenar o valor.
 * @param {string | (() => string)} value - O valor a ser armazenado. Pode ser uma string ou um callback que retorna uma string.
 */
const promisse_forever: Promise<void> = cache.forever('chave', (): string => {
    const valor = 'Siga o Diaszano no GitHub.';
    return valor;
});

/**
 * Retorna o valor armazenado no cache para a chave informada, se existir.
 * Caso não exista valor para a chave, o método armazena o valor fornecido no cache por um tempo indeterminado e retorna-o.
 * @param {string} key - A chave para buscar o valor.
 * @param {string | (() => string)} value - O valor a ser armazenado caso não exista valor para a chave. Pode ser uma string ou um callback que retorna uma string.
 * @returns {Promise<string>} - O valor armazenado ou o valor informado.
 */
const promisse_rememberForever: Promise<string | null> = cache.rememberForever('chave', (): string => {
    const valor = 'Siga o Diaszano no GitHub.';
    return valor;
});

/**
 * Retorna o valor armazenado no cache para a chave informada, se existir.
 * Caso não exista valor para a chave, o método armazena o valor fornecido no cache por um tempo determinado e retorna-o.
 * @param {string} key - A chave para buscar o valor.
 * @param {string | (() => string)} value - O valor a ser armazenado caso não exista valor para a chave.
 * @param {number} seconds - O tempo de vida do valor em segundos. Se não for informado, o valor será armazenado indefinidamente.
 * @returns {Promise<string>} - O valor armazenado ou o valor informado.
 */
const promisse_rememberremember: Promise<string | null> = cache.remember('chave', (): string => {
    const valor = 'Siga o Diaszano no GitHub.';
    return valor;
}, 5 * 60 * 1000);

```

## Contribuição

Contribuições são sempre bem-vindas! Se você deseja contribuir com
este projeto, por favor abra uma issue ou uma pull request.