/**
 * Interface que define as operações básicas de um cache.
 */
export interface Cache {
  /**
   * Limpa todos os dados do cache.
   * @returns {Promise<void>}
   */
  flush(): Promise<void>;

  /**
   * Retorna o valor armazenado no cache para a chave informada.
   * @param {string} key - A chave para buscar o valor.
   * @returns {Promise<string|null>} - O valor armazenado ou null se não houver valor para a chave.
   */
  get(key: string): Promise<string | null>;

  /**
   * Verifica se existe um valor armazenado para a chave informada.
   * @param {string} key - A chave para verificar a existência do valor.
   * @returns {Promise<boolean>} - True se existe valor armazenado ou False caso contrário.
   */
  has(key: string): Promise<boolean>;

  /**
   * Retorna o valor armazenado no cache para a chave informada e o remove do cache.
   * @param {string} key - A chave para buscar o valor.
   * @returns {Promise<string|null>} - O valor armazenado ou null se não houver valor para a chave.
   */
  pull(key: string): Promise<string | null>;

  /**
   * Remove a chave e o valor associado do cache.
   * @param {string} key - A chave para remover.
   * @returns {Promise<void>}
   */
  forget(key: string): Promise<void>;

  /**
   * Armazena um valor no cache para a chave informada por um tempo determinado.
   * @param {string} key - A chave para armazenar o valor.
   * @param {string | (() => string)} value - O valor a ser armazenado. Pode ser uma string ou um callback que retorna uma string.
   * @param {number} seconds - O tempo de vida do valor em segundos. Se não for informado, o valor será armazenado indefinidamente.
   * @returns {Promise<void>}
   */
  set(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<void>;

  /**
   * Armazena um valor no cache para a chave informada por um tempo determinado caso não exista.
   * @param {string} key - A chave para armazenar o valor.
   * @param {string | (() => string)} value - O valor a ser armazenado. Pode ser uma string ou um callback que retorna uma string.
   * @param {number} seconds - O tempo de vida do valor em segundos. Se não for informado, o valor será armazenado indefinidamente.
   * @returns {Promise<void>}
   */
  add(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<void>;

  /**
   * Armazena um valor no cache para a chave informada por um tempo indefinido.
   * @param {string} key - A chave para armazenar o valor.
   * @param {string | (() => string)} value - O valor a ser armazenado. Pode ser uma string ou um callback que retorna uma string.
   */
  forever(key: string, value: string | (() => string)): Promise<void>;

  /**
   * Retorna o valor armazenado no cache para a chave informada, se existir.
   * Caso não exista valor para a chave, o método armazena o valor fornecido no cache por um tempo indeterminado e retorna-o.
   * @param {string} key - A chave para buscar o valor.
   * @param {string | (() => string)} value - O valor a ser armazenado caso não exista valor para a chave. Pode ser uma string ou um callback que retorna uma string.
   * @returns {Promise<string>} - O valor armazenado ou o valor informado.
   */
  rememberForever(key: string, value: string | (() => string)): Promise<string>;

  /**
   * Retorna o valor armazenado no cache para a chave informada, se existir.
   * Caso não exista valor para a chave, o método armazena o valor fornecido no cache por um tempo determinado e retorna-o.
   * @param {string} key - A chave para buscar o valor.
   * @param {string | (() => string)} value - O valor a ser armazenado caso não exista valor para a chave.
   * @param {number} seconds - O tempo de vida do valor em segundos. Se não for informado, o valor será armazenado indefinidamente.
   * @returns {Promise<string>} - O valor armazenado ou o valor informado.
   */
  remember(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<string>;
}
