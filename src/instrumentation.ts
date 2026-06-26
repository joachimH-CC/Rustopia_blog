export async function register() {
  // Guard: only run in the Node.js runtime.
  // Without this check, Webpack will try to bundle undici for the Edge Runtime
  // where Node.js built-ins (stream, net, etc.) don't exist, causing build errors.
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // In restricted networks (e.g. behind GFW), Node.js fetch (undici) does not
  // automatically use system proxy settings. We configure it explicitly here
  // using the HTTPS_PROXY env var so that NextAuth can reach github.com.
  if (process.env.HTTPS_PROXY) {
    // webpackIgnore: true tells Webpack to skip static analysis of this import.
    // Without it, Webpack tries to bundle undici which depends on Node.js built-ins
    // (stream, net) that don't exist in the Edge/browser bundle.
    const { ProxyAgent, setGlobalDispatcher } = await import(
      /* webpackIgnore: true */ "undici"
    );
    setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
    console.log("[proxy] Global dispatcher set to", process.env.HTTPS_PROXY);
  }
}
