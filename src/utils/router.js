function matchPath(pattern, pathname) {
  const regexPattern = pattern.replace(/:[^/]+/g, '([^/]+)')
  const regex = new RegExp(`^${regexPattern}$`)
  const match = pathname.match(regex)

  if (!match) return null

  const paramNames = (pattern.match(/:[^/]+/g) || []).map((param) => param.slice(1))
  const params = {}

  paramNames.forEach((name, index) => {
    params[name] = match[index + 1]
  })

  return params
}

function createRouter() {
  const routes = []

  function register(method, path, handler) {
    routes.push({ method, path, handler })
  }

  function dispatch(pathname, method, req, res) {
    for (const route of routes) {
      if (route.method !== method) continue

      const params = matchPath(route.path, pathname)
      if (params !== null) {
        return route.handler(req, res, params)
      }
    }

    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ message: 'Not found' }))
  }

  return {
    get: (path, handler) => register('GET', path, handler),
    post: (path, handler) => register('POST', path, handler),
    patch: (path, handler) => register('PATCH', path, handler),
    delete: (path, handler) => register('DELETE', path, handler),
    dispatch,
  }
}

export { matchPath, createRouter }
