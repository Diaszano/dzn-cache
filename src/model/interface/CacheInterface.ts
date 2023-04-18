/**
 * Interface que define as operações básicas de um cache.
 */
interface CacheInterface {
  /**
   * Limpa todos os dados do cache.
   */
  flush(): Promise<void>;

  /**
   * Retorna o valor armazenado no cache para a chave informada.
   * @param key A chave para buscar o valor.
   * @returns O valor armazenado ou null se não houver valor para a chave.
   */
  get(key: string): Promise<string | null>;

  /**
   * Verifica se existe um valor armazenado para a chave informada.
   * @param key A chave para verificar a existência do valor.
   * @returns True se existe valor armazenado ou False caso contrário.
   */
  has(key: string): Promise<boolean>;

  /**
   * Retorna o valor armazenado no cache para a chave informada e remove a chave do cache.
   * @param key A chave para buscar o valor.
   * @returns O valor armazenado ou null se não houver valor para a chave.
   */
  pull(key: string): Promise<string | null>;

  /**
   * Remove a chave e o valor associado do cache.
   * @param key A chave para remover.
   */
  forget(key: string): Promise<void>;

  /**
   * Armazena um valor no cache para a chave informada.
   * @param key A chave para armazenar o valor.
   * @param value O valor a ser armazenado.
   */
  set(key: string, value: string): Promise<void>;

  /**
   * Armazena um valor no cache para a chave informada por um tempo determinado.
   * @param key A chave para armazenar o valor.
   * @param value O valor a ser armazenado.
   * @param seconds O tempo de vida do valor em segundos. Se não for informado, o valor será armazenado indefinidamente.
   */
  put(key: string, value: string, seconds?: number): Promise<void>;

  /**
   * Armazena um valor no cache para a chave informada indefinidamente.
   * @param key A chave para armazenar o valor.
   * @param value O valor a ser armazenado.
   */
  forever(key: string, value: string): Promise<void>;

  /**
   * Retorna o valor armazenado no cache para a chave informada, se existir.
   * Caso não exista valor para a chave, o método armazena o valor fornecido no cache por um tempo indeterminado e retorna-o.
   * @param key A chave para buscar o valor.
   * @param value O valor a ser armazenado caso não exista valor para a chave.
   * @returns O valor armazenado ou o valor informado.
   */
  rememberForever(key: string, value: string): Promise<string>;

  /**
   * Retorna o valor armazenado no cache para a chave informada, se existir.
   * Caso não exista valor para a chave, o método armazena o valor fornecido no cache por um tempo determinado e retorna-o.
   * @param key A chave para buscar o valor.
   * @param value O valor a ser armazenado caso não exista valor para a chave.
   * @param seconds O tempo de vida do valor em segundos. Se não for informado, o valor será armazenado indefinidamente.
   * @returns O valor armazenado ou o valor informado.
   */
  remember(key: string, value: string, seconds?: number): Promise<string>;
}

export { CacheInterface };
