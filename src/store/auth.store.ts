class AuthStore {
  private accessToken: string | null = null;

  private initialized = false;

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  clear() {
    this.accessToken = null;
  }

  getInitialized() {
    return this.initialized;
  }

  setInitialized(value: boolean) {
    this.initialized = value;
  }
}

export default new AuthStore();
