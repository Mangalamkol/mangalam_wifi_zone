// OC200 captive portal injects client MAC in query/header
export function getClientMac() {
  const url = new URL(window.location.href);

  return (
    url.searchParams.get("clientMac") ||
    url.searchParams.get("mac") ||
    window.OMADA_CLIENT_MAC || // injected by OC200
    null
  );
}
