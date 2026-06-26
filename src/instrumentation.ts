export async function register() {
  // In restricted networks (e.g. behind GFW), Node.js fetch (undici) does not
  // automatically use system proxy settings. We configure it explicitly here
  // using the HTTPS_PROXY env var so that NextAuth can reach github.com.
  if (process.env.HTTPS_PROXY) {
    const { ProxyAgent, setGlobalDispatcher } = await import('undici')
    setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY))
    console.log('[proxy] Global dispatcher set to', process.env.HTTPS_PROXY)
  }
}
